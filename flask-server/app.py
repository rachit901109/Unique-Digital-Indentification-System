from flask import Flask,request,render_template,redirect
import pickle   
import urllib.parse
import mysql.connector
import random,string,os
import cv2 as cv
import numpy as np


app = Flask(__name__)

@app.route('/')
def hello_world():
    return "Wrong Password"
# database = {'hasti@1':'basti'}

@app.route('/form-image',methods=['GET', 'POST'])
def image():
    model1=pickle.load(open(r"C:\Users\rachi\Python\LOC\flask-server\aadhar_model.pkl", "rb"))
    model2=pickle.load(open(r"C:\Users\rachi\Python\LOC\flask-server\pan_classify.pkl", "rb"))
    qs = (request.query_string)
    parsed_qs = urllib.parse.parse_qs(qs)
    # print(qs,parsed_qs,sep="\n")
    data=[]
    plis=[]
    for i in parsed_qs:
        data.append(parsed_qs[i][0].decode('utf-8'))
    # print(data)
    plis.append(data[2])
    plis.append(data[4])
    # for i in plis:
    #     type(i)
    try:
        print("debug")
        db=mysql.connector.connect(
            host="localhost",
            user="root",
            passwd="1732314",
            database="docv"
        )
        cur=db.cursor()
        for i in plis:
            if os.path.exists(i):
                cur.execute(f"UPDATE user SET ano='{data[1]}',pno='{data[3]}',aloc='{data[2]}',ploc='{data[4]}' WHERE fname='{data[0]}'")
                db.commit()
                # print("tu smart hai")
            else:
                print("else path")
        # Aadhar prediction
        img=cv.imread(data[2])
        img=cv.cvtColor(img,cv.COLOR_BGR2GRAY)
        img=cv.resize(img,(300,300))
        img=np.expand_dims(img,axis=-1)
        img=np.expand_dims(img,axis=0)
        
        prediction=model1.predict(img)
        
        if prediction[0][0]>0.5:
            print("invalid aadhar")
        else:
            print("valid aadhar")

        # Pan prediction
        img=cv.imread(data[4])
        img=cv.cvtColor(img,cv.COLOR_BGR2GRAY)
        img=cv.resize(img,(300,300))
        img=np.expand_dims(img,axis=-1)
        img=np.expand_dims(img,axis=0)
        
        prediction2=model2.predict(img)
        if prediction2[0][0]>0.6:
            print("invalid pan")
        else:
            print("valid pan")
    except Exception as e:
        print(e)
        return e
    finally:
        db.close()
    return "h"


@app.route('/form-signin',methods=['POST','GET'])
def signin():
    qs = (request.query_string)
    parsed_qs = urllib.parse.parse_qs(qs)
    data=[]
    for i in parsed_qs:
        data.append(parsed_qs[i][0].decode('utf-8'))
    print(data)
    try:
        db=mysql.connector.connect(
                host="localhost",
                user="root",
                passwd="1732314",
                database="docv"
            )
        cur=db.cursor()
        cur.execute(f"SELECT psw FROM user WHERE email='{data[0]}';")
        typepsw=cur.fetchall()[0][0]
        if(data[1]==typepsw):
            loc="http://localhost:5173/newhome"
        else:
            loc="http://127.0.0.1:5000/newsignin"
    except Exception as e:
        return e
    # return redirect('http://localhost:5173/newhome')
    # return "just this"
    return redirect(loc)

@app.route('/form-signup',methods=['POST','GET'])
def signup():
    qs = (request.query_string)
    parsed_qs = urllib.parse.parse_qs(qs)
    data=[]
    for i in parsed_qs:
        data.append(parsed_qs[i][0].decode('utf-8'))
    print(data)
    if data[2]==data[3]:
        try:
            db=mysql.connector.connect(
                host="localhost",
                user="root",
                passwd="1732314",
                database="docv"
            )
            cur=db.cursor()
            cur.execute("SELECT udi FROM user;")
            li=[i[0] for i in cur.fetchall()]
            def udigen():
                udi = ''.join(random.choices(string.ascii_letters +string.digits, k=10))
                while udi in li:
                    udi = ''.join(random.choices(string.ascii_letters +string.digits, k=10))
                return udi
            cur.execute(f"INSERT INTO user(fname,email,psw,udi) VALUES('{data[0]}','{data[1]}','{data[2]}','{udigen()}');")
            db.commit()
            db.close()
        except Exception as e:
            return str(e)
            # pass
            #return something went wrong
    else:
        pass
        return "password and re-password don't match"
    return redirect('http://localhost:5173/signin')

        
if __name__ == '__main__':
    app.run(debug=True)
    # CORS(app)