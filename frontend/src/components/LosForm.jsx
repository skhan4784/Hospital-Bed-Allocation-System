// LosForm.jsx
import { useState } from "react";
import "./LosForm.css";

function LosForm() {
  const [form, setForm] = useState({
    dialysisRenalEndStage: 0,
    asthma: 0,
    ironDef: 0,
    pneum: 0,
    substanceDependence: 0,
    psychologicalDisorderMajor: 0,
    depress: 0,
    psychoTher: 0,
    fibrosisAndOther: 0,
    malnutrition: 0,
    hemo: 0,
    hematocrit: "",
    neutrophils: "",
    sodium: "",
    glucose: "",
    bloodUreaNitro: "",
    creatinine: "",
    bmi: "",
    pulse: "",
    respiration: "",
    secondaryDiagnosisNonICD9: "",
    numberOfIssues: "",
    gender: "",
    rCount: "",
    facId: "",
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("1", form.dialysisRenalEndStage);
    formData.append("2", form.asthma);
    formData.append("3", form.ironDef);
    formData.append("4", form.pneum);
    formData.append("5", form.substanceDependence);
    formData.append("6", form.psychologicalDisorderMajor);
    formData.append("7", form.depress);
    formData.append("8", form.psychoTher);
    formData.append("9", form.fibrosisAndOther);
    formData.append("10", form.malnutrition);
    formData.append("11", form.hemo);
    formData.append("12", form.hematocrit);
    formData.append("13", form.neutrophils);
    formData.append("14", form.sodium);
    formData.append("15", form.glucose);
    formData.append("16", form.bloodUreaNitro);
    formData.append("17", form.creatinine);
    formData.append("18", form.bmi);
    formData.append("19", form.pulse);
    formData.append("20", form.respiration);
    formData.append("21", form.secondaryDiagnosisNonICD9);
    formData.append("22", form.numberOfIssues);
    formData.append("23", form.gender);
    formData.append("24", form.rCount);
    formData.append("25", form.facId);

    setLoading(true);

    fetch("http://127.0.0.1:5000/api/predict", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.text())
      .then((html) => {
        setResult(html);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  };

  const onChange = (event) => {
    const name = event.target.name;
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
          ? 1
          : 0
        : event.target.value;
    setForm({ ...form, [name]: value });
  };

  const handleClear = () => {
   setForm({
     dialysisRenalEndStage: 0,
     asthma: 0,
     ironDef: 0,
     pneum: 0,
     substanceDependence: 0,
     psychologicalDisorderMajor: 0,
     depress: 0,
     psychoTher: 0,
     fibrosisAndOther: 0,
     malnutrition: 0,
     hemo: 0,
     hematocrit: "",
     neutrophils: "",
     sodium: "",
     glucose: "",
     bloodUreaNitro: "",
     creatinine: "",
     bmi: "",
     pulse: "",
     respiration: "",
     secondaryDiagnosisNonICD9: "",
     numberOfIssues: "",
     gender: "",
     rCount: "",
     facId: ""
   });
 
   // Uncheck all checkboxes
   const checkboxes = document.querySelectorAll('input[type="checkbox"]');
   checkboxes.forEach(checkbox => {
     checkbox.checked = false;
   });
 
   setResult("");
 };
 

  return (
    <div className="form-container">
      <form className="los-form" onSubmit={handleSubmit}>
        <h2>LOS Prediction Model</h2>
        <h3>Enter the medical information</h3>

        <div className="input-group">
          <label htmlFor="hematocrit">Hematocrit</label>
          <input
            type="number"
            id="hematocrit"
            name="hematocrit"
            value={form.hematocrit}
            onChange={onChange}
            placeholder="Hematocrit"
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="neutrophils">Neutrophils</label>
          <input
            type="number"
            id="neutrophils"
            name="neutrophils"
            value={form.neutrophils}
            onChange={onChange}
            placeholder="Neutrophils"
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="sodium">Sodium</label>
          <input
            type="number"
            id="sodium"
            name="sodium"
            value={form.sodium}
            onChange={onChange}
            placeholder="Sodium"
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="glucose">Glucose</label>
          <input
            type="number"
            id="glucose"
            name="glucose"
            value={form.glucose}
            onChange={onChange}
            placeholder="Glucose"
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="bloodUreaNitro">Blood Urea Nitro</label>
          <input
            type="number"
            id="bloodUreaNitro"
            name="bloodUreaNitro"
            value={form.bloodUreaNitro}
            onChange={onChange}
            placeholder="Blood Urea Nitro"
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="creatinine">Creatinine</label>
          <input
            type="number"
            id="creatinine"
            name="creatinine"
            value={form.creatinine}
            onChange={onChange}
            placeholder="Creatinine"
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="bmi">BMI</label>
          <input
            type="number"
            id="bmi"
            name="bmi"
            value={form.bmi}
            onChange={onChange}
            placeholder="BMI"
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="pulse">Pulse</label>
          <input
            type="number"
            id="pulse"
            name="pulse"
            value={form.pulse}
            onChange={onChange}
            placeholder="Pulse"
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="respiration">Respiration</label>
          <input
            type="number"
            id="respiration"
            name="respiration"
            value={form.respiration}
            onChange={onChange}
            placeholder="Respiration"
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="secondaryDiagnosisNonICD9">
            Secondary Diagnosis Non ICD9
          </label>
          <input
            type="number"
            id="secondaryDiagnosisNonICD9"
            name="secondaryDiagnosisNonICD9"
            value={form.secondaryDiagnosisNonICD9}
            onChange={onChange}
            placeholder="Secondary Diagnosis Non ICD9"
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="numberOfIssues">Number of Issues</label>
          <input
            type="number"
            id="numberOfIssues"
            name="numberOfIssues"
            value={form.numberOfIssues}
            onChange={onChange}
            placeholder="Number of Issues"
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="gender">Gender</label>
          <input
            type="text"
            id="gender"
            name="gender"
            value={form.gender}
            onChange={onChange}
            placeholder="Gender"
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="rCount">R Count</label>
          <input
            type="number"
            id="rCount"
            name="rCount"
            value={form.rCount}
            onChange={onChange}
            placeholder="R Count"
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="facId">Facid</label>
          <input
            type="text"
            id="facId"
            name="facId"
            value={form.facId}
            onChange={onChange}
            placeholder="Facid"
            required
          />
        </div>

        <h3>Check for the following conditions</h3>

        <div className="checkbox-group">
          <div className="checkbox-container">
            <input
              type="checkbox"
              id="dialysisRenalEndStage"
              name="dialysisRenalEndStage"
              value={form.dialysisRenalEndStage}
              onChange={onChange}
            />
            <label htmlFor="dialysisRenalEndStage">
              Dialysis Renal End Stage
            </label>
          </div>

          <div className="checkbox-container">
            <input
              type="checkbox"
              id="asthma"
              name="asthma"
              value={form.asthma}
              onChange={onChange}
            />
            <label htmlFor="asthma">Asthma</label>
          </div>

          <div className="checkbox-container">
            <input
              type="checkbox"
              id="ironDef"
              name="ironDef"
              value={form.ironDef}
              onChange={onChange}
            />
            <label htmlFor="ironDef">Iron Deficiency</label>
          </div>

          <div className="checkbox-container">
            <input
              type="checkbox"
              id="pneum"
              name="pneum"
              value={form.pneum}
              onChange={onChange}
            />
            <label htmlFor="pneum">Pneumonia</label>
          </div>

          <div className="checkbox-container">
            <input
              type="checkbox"
              id="substanceDependence"
              name="substanceDependence"
              value={form.substanceDependence}
              onChange={onChange}
            />
            <label htmlFor="substanceDependence">Substance Dependence</label>
          </div>

          <div className="checkbox-container">
            <input
              type="checkbox"
              id="psychologicalDisorderMajor"
              name="psychologicalDisorderMajor"
              value={form.psychologicalDisorderMajor}
              onChange={onChange}
            />
            <label htmlFor="psychologicalDisorderMajor">
              Psychological Disorder Major
            </label>
          </div>

          <div className="checkbox-container">
            <input
              type="checkbox"
              id="depress"
              name="depress"
              value={form.depress}
              onChange={onChange}
            />
            <label htmlFor="depress">Depression</label>
          </div>

          <div className="checkbox-container">
            <input
              type="checkbox"
              id="psychoTher"
              name="psychoTher"
              value={form.psychoTher}
              onChange={onChange}
            />
            <label htmlFor="psychoTher">Psychotherapy</label>
          </div>

          <div className="checkbox-container">
            <input
              type="checkbox"
              id="fibrosisAndOther"
              name="fibrosisAndOther"
              value={form.fibrosisAndOther}
              onChange={onChange}
            />
            <label htmlFor="fibrosisAndOther">Fibrosis and Other</label>
          </div>

          <div className="checkbox-container">
            <input
              type="checkbox"
              id="malnutrition"
              name="malnutrition"
              value={form.malnutrition}
              onChange={onChange}
            />
            <label htmlFor="malnutrition">Malnutrition</label>
          </div>

          <div className="checkbox-container">
            <input
              type="checkbox"
              id="hemo"
              name="hemo"
              value={form.hemo}
              onChange={onChange}
            />
            <label htmlFor="hemo">Hemo</label>
          </div>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Predicting Result..." : "Submit Form"}
        </button>

        {result && (
          <div className="result-container">
            <button type="button" onClick={handleClear}>
              Clear Prediction
            </button>
            <div
              dangerouslySetInnerHTML={{ __html: result }}
              className="result"
            />
          </div>
        )}
      </form>
    </div>
  );
}

export default LosForm;
