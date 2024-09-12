import Link from 'next/link';

const Common = () => (
  <>
    <section id="about-us" className="py-5">
      <div className="container text-center">
        <h2 className="display-5">About Us</h2>
        <p className="lead mb-4">
          At UltimateFileConverter, we strive to provide a comprehensive suite of file conversion and downloading tools. Our mission is to simplify file management and ensure seamless conversions across various formats. With our user-friendly interface and powerful technology, we cater to a wide range of needs for both personal and professional use.
        </p>
        <Link href="/about" className="btn btn-info btn-lg">Learn More About Us</Link>
      </div>
    </section>

    <section id="technology" className="bg-light py-5">
      <div className="container text-center">
        <h2 className="display-5">Our Technology</h2>
        <p className="lead mb-4">
          Our platform utilizes cutting-edge technology to deliver fast and reliable file conversions. We employ state-of-the-art algorithms and ensure our tools are optimized for performance and accuracy. Whether you're converting images, videos, audio, or documents, our technology guarantees top-notch results.
        </p>
        <Link href="/technology" className="btn btn-secondary btn-lg">Explore Our Technology</Link>
      </div>
    </section>

    <section id="how-it-works" className="py-5">
      <div className="container text-center">
        <h2 className="display-5">How It Works</h2>
        <p className="lead mb-4">
          Using UltimateFileConverter is easy! Simply select the tool you need, upload your file, choose your desired format or options, and let our system handle the rest. Within moments, you'll have your converted file ready for download. Our straightforward process ensures that you can get your tasks done quickly and efficiently.
        </p>
        <Link href="/how-it-works" className="btn btn-warning btn-lg">Learn More</Link>
      </div>
    </section>

    <section id="services" className="py-5">
      <div className="container">
        <h2 className="display-5 text-center mb-4">Our Services</h2>
        <div className="row">
          <div className="col-md-6 mb-4">
            <h3 className="display-6">Convert Files</h3>
            <ul className="list-unstyled">
              {['archive-converter', 'audio-converter', 'cad-converter', 'document-converter', 'ebook-converter', 'font-converter', 'image-converter', 'presentation-converter', 'spreadsheet-converter', 'vector-converter', 'video-converter'].map((tool) => (
                <li key={tool}>
                  <Link href={`/tools/${tool}`} className="text-dark">{tool.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-md-6 mb-4">
            <h3 className="display-6">Optimize Files</h3>
            <ul className="list-unstyled">
              {['compress-pdf', 'compress-png', 'compress-jpg'].map((tool) => (
                <li key={tool}>
                  <Link href={`/tools/${tool}`} className="text-dark">{tool.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</Link>
                </li>
              ))}
            </ul>
            <h3 className="display-6 mt-4">Archives</h3>
            <ul className="list-unstyled">
              {['create-archive', 'extract-archive'].map((tool) => (
                <li key={tool}>
                  <Link href={`/tools/${tool}`} className="text-dark">{tool.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section id="api" className="bg-light py-5">
      <div className="container">
        <h2 className="display-5 text-center mb-4">Powerful API</h2>
        <p className="lead text-center mb-4">
          Our API allows custom integrations with your app. Pay only for what you actually use, and enjoy huge discounts for high-volume customers. Explore features such as full Amazon S3 integration and more.
        </p>
        <div className="row">
          <div className="col-md-6 mb-4">
            <h3 className="display-6">Convert Files</h3>
            <ul className="list-unstyled">
              {['file-conversion', 'office-to-pdf', 'iwork-to-pdf', 'pdf-to-office', 'video-encoding'].map((api) => (
                <li key={api}>
                  <Link href={`/api/${api}`} className="text-dark">{api.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-md-6 mb-4">
            <h3 className="display-6">Capture Websites</h3>
            <ul className="list-unstyled">
              {['html-to-pdf', 'website-screenshot'].map((api) => (
                <li key={api}>
                  <Link href={`/api/${api}`} className="text-dark">{api.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</Link>
                </li>
              ))}
            </ul>
            <h3 className="display-6 mt-4">Optimize Files</h3>
            <ul className="list-unstyled">
              {['compress-pdf', 'compress-images'].map((api) => (
                <li key={api}>
                  <Link href={`/api/${api}`} className="text-dark">{api.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</Link>
                </li>
              ))}
            </ul>
            <h3 className="display-6 mt-4">Other APIs</h3>
            <ul className="list-unstyled">
              {['merge-pdf', 'thumbnail', 'watermark'].map((api) => (
                <li key={api}>
                  <Link href={`/api/${api}`} className="text-dark">{api.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section id="pricing" className="py-5">
      <div className="container text-center">
        <h2 className="display-5">Pricing</h2>
        <p className="lead mb-4">
          Discover our flexible pricing plans that suit every need. From pay-as-you-go options to subscription plans for high-volume users, we offer competitive rates and transparent billing.
        </p>
        <Link href="/pricing" className="btn btn-success btn-lg">View Pricing</Link>
      </div>
    </section>

    <section id="contact" className="bg-light py-5">
      <div className="container text-center">
        <h2 className="display-5">Contact Us</h2>
        <p className="lead mb-4">
          Have questions or need support? Reach out to us through our contact page for assistance or to schedule a demo.
        </p>
        <Link href="/contact" className="btn btn-primary btn-lg">Contact Us</Link>
      </div>
    </section>
  </>
);

export default Common;
