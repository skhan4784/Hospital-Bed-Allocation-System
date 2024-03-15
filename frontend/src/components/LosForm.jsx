import { useState } from 'react';
import './LosForm.css';

function Form() {
   const [form, setForm] = useState({
      dialysisrenalendstage: "",
      asthma: "",
      irondef: "",
      pneum: "",
      substancedependence: "",
      psychologicaldisordermajor: "",
      depress: "",
      psychother: "",
      fibrosisandother: "",
      malnutrition: "",
      hemo: "",
      hematocrit: "",
      neutrophils: "",
      sodium: "",
      glucose: "",
      bloodureanitro: "",
      creatinine: "",
      bmi: "",
      pulse: "",
      respiration: "",
      secondarydiagnosisnonicd9: "",
      numberofissues: "",
      gender_F: "",
      gender_M: "",
      rcount_0: "",
      rcount_1: "",
      rcount_2: "",
      rcount_3: "",
      rcount_4: "",
      rcount_5_plus: "",
      facid_A: "",
      facid_B: "",
      facid_C: "",
      facid_D: "",
      facid_E: ""
    });

   const [loading, setLoading] = useState(false);
   const [result, setResult] = useState("");

   const handleSubmit = (event) => {
      event.preventDefault();

      const form_data = new FormData();
      form_data.append("1", form.dialysisrenalendstage);
      form_data.append("2", form.asthma);
      form_data.append("3", form.irondef);
      form_data.append("4", form.pneum);
      form_data.append("5", form.substancedependence);
      form_data.append("6", form.psychologicaldisordermajor);
      form_data.append("7", form.depress);
      form_data.append("8", form.psychother);
      form_data.append("9", form.fibrosisandother);
      form_data.append("10", form.malnutrition);
      form_data.append("11", form.hemo);
      form_data.append("12", form.hematocrit);
      form_data.append("13", form.neutrophils);
      form_data.append("14", form.sodium);
      form_data.append("15", form.glucose);
      form_data.append("16", form.bloodureanitro);
      form_data.append("17", form.creatinine);
      form_data.append("18", form.bmi);
      form_data.append("19", form.pulse);
      form_data.append("20", form.respiration);
      form_data.append("21", form.secondarydiagnosisnonicd9);
      form_data.append("22", form.numberofissues);
      form_data.append("23", form.gender_F);
      form_data.append("24", form.gender_M);
      form_data.append("25", form.rcount_0);
      form_data.append("26", form.rcount_1);
      form_data.append("27", form.rcount_2);
      form_data.append("28", form.rcount_3);
      form_data.append("29", form.rcount_4);
      form_data.append("30", form.rcount_5_plus);
      form_data.append("31", form.facid_A);
      form_data.append("32", form.facid_B);
      form_data.append("33", form.facid_C);
      form_data.append("34", form.facid_D);
      form_data.append("35", form.facid_E);

      setLoading(true);

      fetch('http://127.0.0.1:5000/predict', {
         method: 'POST',
         body: form_data
      })
         .then(response => response.text())
         .then(html => {
            setResult(html);
            setLoading(false);
         })
   };

   const onChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setForm({ ...form, [name]: value });
   };

   const handleClear = () => {
      setForm({
         dialysisrenalendstage: "",
         asthma: "",
         irondef: "",
         pneum: "",
         substancedependence: "",
         psychologicaldisordermajor: "",
         depress: "",
         psychother: "",
         fibrosisandother: "",
         malnutrition: "",
         hemo: "",
         hematocrit: "",
         neutrophils: "",
         sodium: "",
         glucose: "",
         bloodureanitro: "",
         creatinine: "",
         bmi: "",
         pulse: "",
         respiration: "",
         secondarydiagnosisnonicd9: "",
         numberofissues: "",
         gender_F: "",
         gender_M: "",
         rcount_0: "",
         rcount_1: "",
         rcount_2: "",
         rcount_3: "",
         rcount_4: "",
         rcount_5_plus: "",
         facid_A: "",
         facid_B: "",
         facid_C: "",
         facid_D: "",
         facid_E: ""
      });

      setResult("");
   };

   return (
      <form onSubmit={handleSubmit}>
         <h4>LOS Prediction Model</h4>
         <input type="number" name="dialysisrenalendstage" value={form.dialysisrenalendstage} onChange={onChange} placeholder="Dialysis Renal End Stage" required />
         <input type="number" name="asthma" value={form.asthma} onChange={onChange} placeholder="Asthma" required />
         <input type="number" name="irondef" value={form.irondef} onChange={onChange} placeholder="Iron Deficiency" required />
         <input type="number" name="pneum" value={form.pneum} onChange={onChange} placeholder="Pneumonia" required />
         <input type="number" name="substancedependence" value={form.substancedependence} onChange={onChange} placeholder="Substance Dependence" required />
         <input type="number" name="psychologicaldisordermajor" value={form.psychologicaldisordermajor} onChange={onChange} placeholder="Psychological Disorder Major" required />
         <input type="number" name="depress" value={form.depress} onChange={onChange} placeholder="Depression" required />
         <input type="number" name="psychother" value={form.psychother} onChange={onChange} placeholder="Psychotherapy" required />
         <input type="number" name="fibrosisandother" value={form.fibrosisandother} onChange={onChange} placeholder="Fibrosis and Other" required />
         <input type="number" name="malnutrition" value={form.malnutrition} onChange={onChange} placeholder="Malnutrition" required />
         <input type="number" name="hemo" value={form.hemo} onChange={onChange} placeholder="Hemo" required />
         <input type="number" name="hematocrit" value={form.hematocrit} onChange={onChange} placeholder="Hematocrit" required />
         <input type="number" name="neutrophils" value={form.neutrophils} onChange={onChange} placeholder="Neutrophils" required />
         <input type="number" name="sodium" value={form.sodium} onChange={onChange} placeholder="Sodium" required />
         <input type="number" name="glucose" value={form.glucose} onChange={onChange} placeholder="Glucose" required />
         <input type="number" name="bloodureanitro" value={form.bloodureanitro} onChange={onChange} placeholder="Blood Urea Nitro" required />
         <input type="number" name="creatinine" value={form.creatinine} onChange={onChange} placeholder="Creatinine" required />
         <input type="number" name="bmi" value={form.bmi} onChange={onChange} placeholder="BMI" required />
         <input type="number" name="pulse" value={form.pulse} onChange={onChange} placeholder="Pulse" required />
         <input type="number" name="respiration" value={form.respiration} onChange={onChange} placeholder="Respiration" required />
         <input type="number" name="secondarydiagnosisnonicd9" value={form.secondarydiagnosisnonicd9} onChange={onChange} placeholder="Secondary Diagnosis Non ICD9" required />
         <input type="number" name="numberofissues" value={form.numberofissues} onChange={onChange} placeholder="Number of Issues" required />
         <input type="number" name="gender_F" value={form.gender_F} onChange={onChange} placeholder="Gender Female" required />
         <input type="number" name="gender_M" value={form.gender_M} onChange={onChange} placeholder="Gender Male" required />
         <input type="number" name="rcount_0" value={form.rcount_0} onChange={onChange} placeholder="R Count 0" required />
         <input type="number" name="rcount_1" value={form.rcount_1} onChange={onChange} placeholder="R Count 1" required />
         <input type="number" name="rcount_2" value={form.rcount_2} onChange={onChange} placeholder="R Count 2" required />
         <input type="number" name="rcount_3" value={form.rcount_3} onChange={onChange} placeholder="R Count 3" required />
         <input type="number" name="rcount_4" value={form.rcount_4} onChange={onChange} placeholder="R Count 4" required />
         <input type="number" name="rcount_5_plus" value={form.rcount_5_plus} onChange={onChange} placeholder="R Count 5+" required />
         <input type="number" name="facid_A" value={form.facid_A} onChange={onChange} placeholder="Facid A" required />
         <input type="number" name="facid_B" value={form.facid_B} onChange={onChange} placeholder="Facid B" required />
         <input type="number" name="facid_C" value={form.facid_C} onChange={onChange} placeholder="Facid C" required />
         <input type="number" name="facid_D" value={form.facid_D} onChange={onChange} placeholder="Facid D" required />
         <input type="number" name="facid_E" value={form.facid_E} onChange={onChange} placeholder="Facid E" required />

         <button type="submit" disabled={loading}>{loading ? "Predicting Result..." : "Submit Form"}</button>
         {result && <span onClick={handleClear}>Clear Prediction</span>}

         {result && <div dangerouslySetInnerHTML={{ __html: result }} className="result" />}
      </form>
   );
}

export default Form;