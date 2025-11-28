import React from "react";
import "./Accordion.css"; // include the above CSS

export default function CustomAccordion() {
  return (
    <section className="accordion-section d-flex justify-content-center ">
      <div className="accordion-wrapper">
        <details>
          <summary className="accordion-header d-flex align-items-center justify-content-between">
            <h4 className="m-0">
              Best Builders in Madurai and Coimbatore for Premium Villas and Apartments
            </h4>
          </summary>
          <div className="accordion-body mt-3">
            <p>
              If you are looking for <a href="/#" role="button">builders in Madurai</a> who deliver
              outstanding quality...
            </p>
            {/* ...rest of your content */}
          </div>
        </details>
      </div>
    </section>
  );
}
