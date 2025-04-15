import React, {useState, useEffect} from 'react';
import axios from 'axios';

const DepartmentSection = () => {
    const [dprtmntSection, setDprtmntSection] = useState({
      curriculum_id: '',
      section_id: '',
    });

    const [curriculumList, setCurriculumList] = useState([]);
    const [sectionsList, setSectionsList] = useState([]);

    const fetchCurriculum = async () => {
      try {
        const response = await axios.get('http://localhost:5000/get_curriculum');
        setCurriculumList(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchSections = async () => {
      try {
        const response = await axios.get('http://localhost:5000/section_table');
        setSectionsList(response.data);
      } catch (err) {
        console.log(err);
      }
    };
  
      
    useEffect(() => {
      fetchCurriculum();
      fetchSections();
    }, []);

    const handleChangesForEverything = (e) => {
      const { name, value } = e.target;
    
      setDprtmntSection(prev => ({
        ...prev,
        [name]: value
      }));
    };

    const handleAddingDprtmntrSection = async () => {
      try {
        await axios.post('http://localhost:5000/department_section', dprtmntSection)
        setDprtmntSection({curriculum_id: '', section_id: ''});
      } catch(err){
        console.log(err);
      }
    }

      return(
         <div>
            <div>
                <select name="curriculum_id" id="curriculum_id" value={dprtmntSection.curriculum_id} onChange={handleChangesForEverything}>
                    {curriculumList.map((curriculumList)=> (
                        <option key={curriculumList.curriculum_id} value={curriculumList.curriculum_id}>{curriculumList.year_description}-{curriculumList.program_description} | {curriculumList.curriculum_id}</option>
                    ))}
                </select>
            </div>
            <div>
                <select name="section_id" id="section_id" value={dprtmntSection.section_id} onChange={handleChangesForEverything}>
                    <option value="">Select Section</option>
                    {sectionsList.map((section)=> (
                        <option key={section.id} value={section.id}>{section.section_description} | {section.id}</option>
                    ))}
                </select>
            </div>
            <button onClick={handleAddingDprtmntrSection}>Insert</button>
         </div>
      )

}

export default DepartmentSection