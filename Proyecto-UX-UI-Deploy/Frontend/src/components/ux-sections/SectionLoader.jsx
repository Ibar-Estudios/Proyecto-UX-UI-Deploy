import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

const SectionLoader = ({ children }) => {
  const { sectionName } = useParams();
  const [section, setSection] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`/ux-sections/${sectionName}`)
      .then(res => {
        setSection(res.data.data);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, [sectionName]);

  if (loading) return <div className="flex justify-center p-8">Cargando...</div>;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-8 max-w-4xl mx-auto">
      <h2 className="text-4xl font-bold mb-8">{section.title}</h2>
      <p className="text-lg mb-6">{section.description}</p>
      {children(section)}
    </motion.div>
  );
};

export default SectionLoader;
