import React from "react";
import { motion } from "framer-motion";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";
import { styles } from "../styles";
import { fadeIn, textVariant } from "../utils/motion";

const Tech = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>My Certifications</p>
        <h2 className={styles.sectionHeadText}>Professional Development.</h2>
      </motion.div>
      <div className='mt-20 flex flex-wrap gap-7'>
        {technologies.map((cert, index) => (
          <motion.div
            variants={fadeIn("up", "spring", index * 0.5, 0.75)}
            className='w-full sm:w-[360px] p-[1px] rounded-[20px] shadow-card'
            key={cert.name}
          >
            <div className='bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col'>
              <img src={cert.icon} alt={cert.name} className='w-16 h-16 object-contain' />
              <h3 className='text-white text-[20px] font-bold text-center'>{cert.name}</h3>
              <p className='text-secondary text-[14px] text-center'>{cert.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Tech, "");
