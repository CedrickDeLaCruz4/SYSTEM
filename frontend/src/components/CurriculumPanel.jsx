import React, {useState, useEffect} from "react";
import axios from 'axios';

const CurriculumPanel = () => {
    const [curriculum, setCurriculum] = useState({
        year_id: '',
        program_id: '',
    });
    
    const [yearList, setYearList] = useState([]);
    const [programList, setProgramList] = useState([]);

    const fetchYear = async () => {
        try{
            const response = await axios.get('http://localhost:5000/year');
            setYearList(response.data);
        }catch(err){
            console.log(err);
        }
    }

    const fetchProgram = async () => {
        try{
            const response = await axios.get('http://localhost:5000/get_program');
            setProgramList(response.data);
        }catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        fetchYear();
        fetchProgram();
    }, []);

    const handleChangesForEverything = (e) => {
        const { name, value } = e.target;
    
        setCurriculum(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const handleAddingCurriculum = async () => {
        if (!curriculum.year_id ||
            !curriculum.program_id
        ){
            alert("Please fill all field");
        }

        try{
            await axios.post('http://localhost:5000/curriculum', curriculum);
            setCurriculum({year_id: '', program_id: ''});
        }catch(err){
            console.log(err);
        }
    };

    return(
        <div>
        <h1> Insert Curriculum</h1>
        <div className="textField">
            <label htmlFor="year">Curriculum Year:</label>
            <select name="year_id" id="year" value={curriculum.year_id} onChange={handleChangesForEverything}>
                <option>Choose Year</option>
                {yearList.map((year) => (
                    <option key={year.year_id} value={year.year_id}>{year.year_description}</option>
                ))}
            </select>
        </div>
        <div className="textField">
            <label htmlFor="program">Program:</label>
            <select name="program_id" id="program" value={curriculum.program_id} onChange={handleChangesForEverything}>
                <option>Choose Program</option>
                {programList.map((program) => (
                    <option key={program.program_id} value={program.program_id}>{program.program_description} | {program.program_code} | {program.program_id}</option>
                ))}
            </select>
        </div>
        <button style={{ background: 'maroon', color: 'white' }} onClick={handleAddingCurriculum}>Insert</button>
    </div>
    )
}
export default CurriculumPanel;