import React, {useState, useEffect} from "react";
import axios from 'axios';

const ProgramPanel = () => {

    // PROGRAM PANEL FORM
    const [program, setProgram] = useState({
        name: '',
        code: '',
    });
    const handleChangesForEverything = (e) => {
        const { name, value } = e.target;
        
        
        // PROGRAM PANEL FORM
        setProgram(prev => ({
            ...prev,
            [name]: value
        }));
    }
    const handleAddingProgram = async () => {
        if (!program.name ||
          !program.code) {
          alert("Please fill all field");
        }
    
        else {
          try {
            await axios.post('http://localhost:5000/program', program);
            setProgram({ name: '', code: ''});
          } catch (err) {
            console.error(err);
          }
        }
      }
      return (
        <div>
                <h1>Program Panel Form</h1>
                <div className="forDepartment">
                    <div className="textField">
                        <label htmlFor="dep_name">Program Description:</label>
                        <input type="text" id="dep_name" name="name" value={program.name} onChange={handleChangesForEverything} placeholder="Enter Program Descriptions" />
                    </div>
                    <div className="textField">
                        <label htmlFor="dep_name">Program Code:</label>
                        <input type="text" id="dep_code" name="code" value={program.code} onChange={handleChangesForEverything} placeholder="Enter Program Code" />
                    </div>
                    <button style={{ background: 'maroon', color: 'white' }} onClick={handleAddingProgram}>Insert</button>
                </div>
            </div>
      )
}
export default ProgramPanel;