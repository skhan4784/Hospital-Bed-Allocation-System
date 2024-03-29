// HomePage.jsx
import React from "react";
import "./HomePage.css";
import TopPanel from "../../components/TopPanel";
import SidePanel from "../../components/SidePanel";
// import HMSbg from "../../assets/images/hmsbg.jpg";

function HomePage() {
  return (
    <div className="home-page">
      <TopPanel />
      <div className="main-content-wrapper">
        <SidePanel />
        <main className="content">
          <div className="hospital-info">
            <h2>Welcome to Hospital Management System</h2>
            <p>
              <strong>Hospital Management System (HMS)</strong> is an integrated
              software solution designed to streamline and automate various
              administrative and operational tasks within a hospital or
              healthcare facility. It offers the following essential
              functionalities:
            </p>
            <ul>
              <li>
                <strong>Patient Records Management:</strong> Efficiently manage
                patient records, including personal information, medical
                history, and treatment plans.
              </li>
              <li>
                <strong>Appointment Scheduling:</strong> Schedule appointments
                for patients and manage doctor availability effectively.
              </li>
              <li>
                <strong>Inventory Management:</strong> Track and manage
                inventory levels of medical supplies, drugs, and equipment to
                ensure seamless operations.
              </li>
              <li>
                <strong>Billing and Invoicing:</strong> Handle billing
                processes, generate invoices, and manage payments for services
                rendered.
              </li>
            </ul>

            <h3>Importance of HMS</h3>
            <p>
              The <strong>Hospital Management System</strong> plays a crucial
              role in enhancing the efficiency and effectiveness of healthcare
              delivery. Key benefits include:
            </p>
            <ul>
              <li>
                <strong>Improved Patient Care:</strong> Enhance patient care
                through streamlined processes and quick access to medical
                records.
              </li>
              <li>
                <strong>Resource Optimization:</strong> Optimize resource
                utilization, including staff, equipment, and facilities, for
                better cost management.
              </li>
              <li>
                <strong>Regulatory Compliance:</strong> Ensure compliance with
                healthcare regulations and standards to maintain quality care
                and patient safety.
              </li>
              <li>
                <strong>Real-time Access:</strong> Provide real-time access to
                critical information for healthcare providers, enabling informed
                decision-making.
              </li>
            </ul>

            <h3>Contribution of Our Platform</h3>
            <p>
              Our platform offers advanced features to meet the unique needs of
              healthcare organizations, including:
            </p>
            <ul>
              <li>
                <strong>Patient Admissions Management:</strong> Streamline
                patient admissions, bed allocations, and discharge processes for
                efficient workflow.
              </li>
              <li>
                <strong>Bed Allocation Optimization:</strong> Automatically
                allocate beds based on patient needs, reducing wait times and
                maximizing resource utilization.
              </li>
              <li>
                <strong>Dashboard Insights:</strong> Provide comprehensive
                insights through user-friendly dashboards, enabling healthcare
                providers to track patient details, bed availability, and
                allocation status in real-time.
              </li>
              <li>
                <strong>Exceptional Patient Experiences:</strong> Empower
                healthcare providers to deliver exceptional patient experiences
                through efficient resource management and personalized care.
              </li>
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
}

export default HomePage;
