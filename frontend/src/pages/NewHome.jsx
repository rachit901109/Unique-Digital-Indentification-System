import React from 'react';

import Header1 from '../partials/Header1';
import PageIllustration from '../partials/PageIllustration';
import NewHeroHome from '../partials/NewHeroHome';
import FeaturesBlocks from '../partials/FeaturesBlocks';
import FeaturesZigZag from '../partials/FeaturesZigzag';
import Testimonials from '../partials/Testimonials';
import Footer from '../partials/Footer';
import ViewDocs from '../partials/ViewDocs';

function NewHome() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/*  Site header */}
      <Header1 />
      
      {/*  Page content */}
      <main className="grow">
        {/*  Page illustration */}
        <div className="relative max-w-6xl mx-auto h-0 pointer-events-none" aria-hidden="true">
          <PageIllustration />
        </div>

        {/*  Page sections */}
        <NewHeroHome />
        <ViewDocs />
      </main>


      {/*  Site footer */}
      <Footer />
    </div>
  );
}

export default NewHome;