import React, { useState, useRef } from 'react';
import { HashRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import './App.css';
// --- Data Dummy Proyek (TIDAK BERUBAH) ---
const projectData = [
  { id: 1, title: "Autonomus Surface Vehicle", slug: "Autonomus Surface Vehicle", description: "Autonomus Survace Vehicle merupakan prototipe kapal yang saya kerjakan bersama team Safinah One, Gamantaray. Saya berperan dalam membuat logika jalan kapal secara otomatis menggunakan Pixhawk yang di program dengan python via pymavlink. Logika pemrograman yang saya buat melibatkan waypoint berupa latitude dan longitude yang di sebar di setiap titik lintasan sehingga kapal harus mengikuti. Logika yang saya tuangkan dalam program ini, mampu mengontrol kapal prototipe untuk mengikuti titik titik sehingga berhasil mengikuti jalur lintasan yang ditentukan. Selain itu pada kapal prototipe ini juga di bantu menggunakan camera vision sebagai deteksi objek yang di tentukan seperti box, bola, dan sebagainya untuk di potret maupun sebagai koreksi jalan kapal. Selain itu, kapal prototipe juga dilengkapi dengan mode kontrol manual yang diwajibkan ketika ingin mengikuti perlombaan demi keamanan dan kelancaran rescue kapal apabila terjadi trouble di tengah lintasan. Selain dengan pixhawk, saya juga mempelajari penggunaan mkrokontroller lain pada sesi sebelumnya, seperti menggunakan arduino, esp, hingga stm32. Namun deminkian, projek ini diputuskan menggunakan pixhwak yang lebih kompetibel dan lebih ringkas karena terdapat port dan sensor imu bawaan." },
  { id: 2, title: "Line Follower and Line Maze", slug: "Robotic and Control", description: "A system created using Raspberry Pi to monitor temperature, humidity, and air quality in a room, accessible via a web dashboard built with Node.js." },
  { id: 3, title: "PID Controller Simulation in Matlab", slug: "pid-controller-simulation", description: "Development of a simulation model using Python (SciPy/Numpy) to test Proportional-Integral-Derivative (PID) control algorithms for various industrial processes." },
  { id: 4, title: "Wonderware Intouch Simulation", slug: "Human Machine Interface", description: "The creation of this responsive and animated portfolio website using React, React Router DOM, and Framer Motion for a modern user experience." },
  { id: 5, title: "Fuzzy Logic Controller", slug: "gesture-control-interface", description: "A hardware-software project where hand movements captured by an accelerometer module are translated into commands for a PC application." },
  { id: 6, title: "SAR Analog Digital Converter", slug: "data-logger-sd-card", description: "A simple data logging device built with ESP32 to record sensor readings (pressure, light) onto an SD card for later analysis." },
  { id: 7, title: "Low Pass Filter Buck Converter", slug: "machine-vision-quality-check", description: "Using OpenCV and Python to create a basic script that identifies defects in simple shapes on a conveyor belt simulator." },
  { id: 8, title: "Leaf Meter Detection Camera Vision", slug: "signal-filter-design", description: "Designing and implementing a digital filter (Low-Pass/High-Pass) using MATLAB to process noisy sensor signals." },
  { id: 9, title: "Smart Home With IoT Monitoring", slug: "automated-hydroponics", description: "An automated system controlling water pump and nutrient dosing based on pH and moisture levels detected by sensors." },
  { id: 10, title: "Private Website React Js", slug: "modbus-tcp-test", description: "Developing a client application to test and simulate Modbus TCP communication with industrial PLCs, written in C# or Java." },
];

// --- Data Dummy Pengalaman/Organisasi (BARU) ---
const experienceData = [
    { id: 1, title: "Hardware And Programing", slug: "riset-teknologi", organization: "GAMANTARAY", period: "masih lupa", role: "GAMANTARAY adalah Gadjah Mada Marine And Naval Riset Activity yang dimana bergerak dalam riset teknologi kapal prototype untuk tujuan perlombaan, menunjang perkembangan teknologi kemaritiman, serta menunjang kreatifitas mahasiswa universitas Gadjah Mada. Saya bertanggungjawab dalam harware dan programing. Selama saya menjadi salah satu programer gamantaray, saya melakukan riset dan pengembangan algoritma kapal prototype yang berjalan secara otomatis. Dengan trajectory tracing menggunakan GPS serta bantuan kamera, saya berhasil membuat kendali aktuator kapal untuk mengikuti jalur. Selain itu gamanataray juga menjadi jalan untuk saya mengikuti perlombaan Kontes Kapal Indonesia yang diselenggarakan oleh PUSPRESNAS di Surabaya. " },
    { id: 2, title: "Intenrnship", slug: "asisten-praktikum", organization: "Metrologi Bantul", period: "Semester Ganjil 2024", role: "Membantu dosen dalam memandu praktikum sirkuit dasar dan pengukuran, memberikan *feedback* kepada 40 mahasiswa." },
    { id: 3, title: "Internship", slug: "ketua-seminar-iot", organization: "PT Kievit Indoneisa", period: "Oktober 2023", role: "Memimpin tim beranggotakan 25 orang untuk menyelenggarakan seminar dengan 300 peserta dan menghadirkan dua pembicara utama industri." },
    { id: 4, title: "On Going", slug: "web-dev-freelance", organization: "Freelance", period: "2022 - 2023", role: "Membangun dan memelihara 3 *website* statis (HTML/CSS) dan 1 *website* berbasis WordPress untuk UMKM lokal." },
    { id: 5, title: "On Going", slug: "lomba-kri-bawah-air", organization: "Tim Kontes Robot Indonesia", period: "2023", role: "Fokus pada pengembangan sistem navigasi dan komunikasi nirkabel untuk robot yang beroperasi di bawah air." },
];

const photoData = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    title: `Photo ${i + 1}`,
    // INI YANG HARUS DIGANTI:
    // Gunakan path publik, biasanya diawali dengan `/`
filename: `${process.env.PUBLIC_URL}/foto/foto-${i + 1}.jpg`, 
description: `Deskripsi singkat tentang momen ini. (Kata kunci: ...)`
}));

// --- Komponen Halaman Projek (TIDAK BERUBAH) ---
function Projek() {
    return (
        <motion.div className="projek-page content" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="page-title">Project Portfolio</h1>
            <p>Berikut adalah beberapa proyek utama yang telah saya kerjakan di bidang Instrumentasi, Kontrol, dan Pemrograman.</p>
            <div className="project-list-grid">
                {projectData.map((project, index) => (
                    <motion.div
                        key={project.id}
                        className="project-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 * index }}
                        whileHover={{ scale: 1.03, boxShadow: "0 8px 15px rgba(0, 191, 255, 0.4)" }}
                    >
                        <h3>{project.id}. {project.title}</h3>
                        <p className="project-summary">{project.description.substring(0, 80)}...</p>
                        <Link to={`/projek/${project.slug}`} className="project-link">View Details →</Link>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}

// --- Komponen Halaman Detail Projek (TIDAK BERUBAH) ---
function DetailProjek() {
    const { slug } = useParams();
    const project = projectData.find(p => p.slug === slug);

    if (!project) {
        return (<motion.div className="content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}><h1 className="page-title">Project Not Found</h1><p>Maaf, proyek yang Anda cari tidak ditemukan.</p><Link to="/projek" className="back-link">← Back to Project List</Link></motion.div>);
    }

    return (
        <motion.div className="detail-projek-page content" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Link to="/projek" className="back-link">← Back to Project List</Link>
            <h1 className="page-title">{project.title}</h1>
            <motion.div className="introduction-section" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
                <h2>Project Overview</h2>
                <p>{project.description}</p>
                <div className="technical-details">
                    <h3>Technical Stack:</h3>
                    <ul><li>Platform: {project.id % 2 === 0 ? "Raspberry Pi / Node.js" : "Arduino / C++"}</li></ul>
                </div>
            </motion.div>
        </motion.div>
    );
}

// --- Komponen Halaman Organisasi (Experience) (BARU) ---
function Organisasi() {
    return (
        <motion.div
            className="organisasi-page content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >
            <h1 className="page-title">Experience & Organization</h1>
            <p>Rangkuman pengalaman organisasi dan kepemimpinan yang telah saya ikuti selama masa studi.</p>
            
            <div className="experience-list">
                {experienceData.map((exp, index) => (
                    <motion.div
                        key={exp.id}
                        className="experience-item"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 * index }}
                        whileHover={{ scale: 1.01 }}
                    >
                        <div className="experience-header">
                            <span className="experience-period">{exp.period}</span>
                            <h3>{exp.title}</h3>
                        </div>
                        <p className="experience-org">at <strong>{exp.organization}</strong></p>
                        <p className="experience-role">{exp.role.substring(0, 100)}...</p>
                        <Link to={`/organisasi/${exp.slug}`} className="project-link">
                            Detail Role →
                        </Link>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}

// --- Komponen Halaman Detail Organisasi (BARU) ---
function DetailOrganisasi() {
    const { slug } = useParams();
    const exp = experienceData.find(e => e.slug === slug);

    if (!exp) {
        return (<motion.div className="content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}><h1 className="page-title">Experience Not Found</h1><p>Maaf, pengalaman yang Anda cari tidak ditemukan.</p><Link to="/organisasi" className="back-link">← Back to Experience List</Link></motion.div>);
    }

    return (
        <motion.div className="detail-organisasi-page content" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Link to="/organisasi" className="back-link">← Back to Experience List</Link>
            <h1 className="page-title">{exp.title}</h1>
            <motion.div className="introduction-section" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
                <h2>Role Overview</h2>
                <p><strong>Organization:</strong> {exp.organization}</p>
                <p><strong>Period:</strong> {exp.period}</p>
                <p>{exp.role}</p>
                <p>[Konten Ngasal Tambahan]: Selama periode ini, saya berhasil mengkoordinasikan 5 sub-divisi dan menyelesaikan pelaporan akhir tepat waktu. Pengalaman ini sangat meningkatkan kemampuan *project management* dan komunikasi saya.</p>
            </motion.div>
        </motion.div>
    );
}

// --- Komponen Halaman FotoRandom (BARU) ---
function FotoRandom() {
    return (
        <motion.div
            className="photo-page content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >
            <h1 className="page-title">Random Photos</h1>
            <p>Koleksi visual singkat dari kegiatan kampus, proyek, dan momen personal.</p>
            
            <div className="photo-grid">
                {photoData.map((photo, index) => (
                    <motion.div
                        key={photo.id}
                        className="photo-card"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: 0.05 * index }}
                        whileHover={{ scale: 1.05, zIndex: 10 }}
                    >
                        <img src={photo.filename} alt={photo.title} />
                        <p className="photo-description">{photo.description}</p>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}

// --- Komponen Halaman Biografi, Kontak, Menu, dan App (DIHILANGKAN UNTUK KERINGKASAN) ---
// ... (Pastikan kode Biografi, KontakMedia, ContactItem, Menu, dan App Anda tetap ada, 
// seperti yang ada di jawaban sebelumnya, hanya bagian Routes yang diubah)

// --- Kode di bawah ini adalah kelanjutan dari App.js Anda sebelumnya ---

function Biografi() {
  return (
    <motion.div
      className="biography-page"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.h1
        className="page-title"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        Biography
      </motion.h1>

      {/* Foto + About Me */}
      <motion.div
        className="top-section"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <motion.div
          className="photo-section"
          whileHover={{ scale: 1.05, rotate: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <img src={`${process.env.PUBLIC_URL}/image.png`} alt="Foto Naufal Najib" />
        </motion.div>
        <motion.div
          className="about-section"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h2>About Me</h2>
          <p><strong>Name:</strong> Naufal Najib</p>
          <p><strong>Place & Date of Birth:</strong> Bantul, 18 October 2004</p>
          <p><strong>Study Program:</strong> Instrumentation and Control Engineering Technology</p>
          <p><strong>Department:</strong> Electro and Informatics Engineering</p>
          <p><strong>Faculty:</strong> Vocational School</p>
          <p><strong>University:</strong> Gadjah Mada University</p>
        </motion.div>
      </motion.div>

      {/* Introduction */}
      <motion.div
        className="introduction-section"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <h2>Introduction</h2>
        <p>
          Hello! My name is Naufal, an enthusiastic student passionate about technology and engineering.
          I enjoy exploring new systems, experimenting with electronics, and creating projects that combine
          hardware and software.
        </p>
      </motion.div>

      {/* Skills */}
      <motion.div
        className="skills-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <h2>Skills</h2>
        <div className="skill">
          <span>Electronics</span>
          <div className="progress-bar"><motion.div initial={{width: 0}} animate={{width: '70%'}} transition={{duration: 1}} /></div>
        </div>
        <p>During my studies in Instrumentation and Control Engineering, I have worked on projects...</p>

        <div className="skill">
          <span>Programming and IoT</span>
          <div className="progress-bar"><motion.div initial={{width: 0}} animate={{width: '80%'}} transition={{duration: 1}} /></div>
        </div>
        <p>During my studies in Instrumentation and Control Engineering, I have worked on projects...</p>

        <div className="skill">
          <span>Control</span>
          <div className="progress-bar"><motion.div initial={{width: 0}} animate={{width: '70%'}} transition={{duration: 1}} /></div>
        </div>
        <p>During my studies in Instrumentation and Control Engineering, I have worked on projects...</p>

        <div className="skill">
          <span>Instruments</span>
          <div className="progress-bar"><motion.div initial={{width: 0}} animate={{width: '80%'}} transition={{duration: 1}} /></div>
        </div>
        <p>During my studies in Instrumentation and Control Engineering, I have worked on projects...</p>
      </motion.div>

      {/* Hobbies */}
      <motion.div
        className="hobbies-section"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <h2>Hobbies</h2>
        <div className="hobby-list">
          <motion.div className="hobby" whileHover={{ scale: 1.1 }}>🏐 Volleyball</motion.div>
          <motion.div className="hobby" whileHover={{ scale: 1.1 }}>💻 Coding</motion.div>
          <motion.div className="hobby" whileHover={{ scale: 1.1 }}>🤖 Robotics</motion.div>
          <motion.div className="hobby" whileHover={{ scale: 1.1 }}>📚 Reading Tech</motion.div>
        </div>
      </motion.div>

      {/* Timeline */}
      <motion.div
        className="timeline-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
      >
        <h2>Education Timeline</h2>
        <ul className="timeline">
          <li><span>2010–2016:</span> SD N Plebengan </li>
          <li><span>2016–2019:</span> SMP N 2 Bambanglipuro</li>
          <li><span>2019–2023:</span> SMA N 1 Bambanglipuro</li>
          <li><span>2023–Present:</span> Universitas Gadjah Mada</li>
        </ul>
      </motion.div>

      {/* Quote */}
      <motion.div
        className="quote-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
      >
        <h2>Quote</h2>
        <p>"We cannot solve our problems with the same thinking we used when we created them." - Albert Einstein</p>
      </motion.div>
    </motion.div>
  );
}

function KontakMedia() {
  const SERVICE_ID = "YOUR_SERVICE_ID";
  const TEMPLATE_ID = "YOUR_TEMPLATE_ID";
  const PUBLIC_KEY = "YOUR_PUBLIC_KEY";

  const form = useRef();
  const [isSending, setIsSending] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSending(true);
    setStatusMessage('');

    if (SERVICE_ID === "YOUR_SERVICE_ID") {
        setStatusMessage('Error: Harap ganti ID EmailJS dengan milik Anda!');
        setIsSending(false);
        return;
    }

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
      .then((result) => {
        setStatusMessage('Pesan berhasil terkirim! Terima kasih.');
        form.current.reset();
      }, (error) => {
        setStatusMessage(`Gagal mengirim pesan. Error: ${error.text}`);
      })
      .finally(() => {
        setIsSending(false);
      });
  };

  return (
    <motion.div className="contact-page content" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
      <h1 className="page-title">Contact & Social Media</h1>
      
      <motion.div className="contact-section" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
        <h2>Find Me Online</h2>
        <ul className="contact-list">
            <ContactItem icon="📱" name="WhatsApp" link="https://wa.me/6281234567890" />
            <ContactItem icon="📸" name="Instagram" link="https://instagram.com/naufal.njb" />
            <ContactItem icon="🔗" name="LinkedIn" link="https://linkedin.com/in/naufalnajib" />
            <ContactItem icon="📧" name="Email" link="mailto:naufalnajib@mail.ugm.ac.id" />
        </ul>
      </motion.div>

      <motion.div className="contact-form-section introduction-section" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}>
        <h2>Send a Message</h2>
        <form ref={form} onSubmit={sendEmail} className="contact-form">
          <input type="text" name="user_name" placeholder="Your Name" required />
          <input type="email" name="user_email" placeholder="Your Email" required />
          <textarea name="message" placeholder="Your Message..." rows="6" required></textarea>
          
          <motion.button type="submit" disabled={isSending} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            {isSending ? 'Sending...' : 'Send Message'}
          </motion.button>
          
          {statusMessage && <p className={`status-message ${statusMessage.includes('Error') ? 'error' : 'success'}`}>{statusMessage}</p>}
        </form>
        <p className="email-note">Pesan akan dikirim ke: <strong>naufalnajib@mail.ugm.ac.id</strong></p>
      </motion.div>
    </motion.div>
  );
}

const ContactItem = ({ icon, name, link }) => (
  <motion.li className="contact-item" whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 300 }}>
    <a href={link} target="_blank" rel="noopener noreferrer">
      <span className="contact-icon">{icon}</span>
      <span className="contact-name">{name}</span>
    </a>
  </motion.li>
);

function Menu() {
  const [open, setOpen] = useState(false);
  return (
    <div className="menu-wrapper">
      <motion.button className="menu-toggle" onClick={() => setOpen(!open)} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>☰</motion.button>
      {open && (
        <motion.nav className="top-menu" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <Link to="/" onClick={() => setOpen(false)}>Biography</Link>
          <Link to="/projek" onClick={() => setOpen(false)}>Project</Link>
          <Link to="/organisasi" onClick={() => setOpen(false)}>Experience</Link>
          <Link to="/foto-random" onClick={() => setOpen(false)}>Random Photos</Link>
          <Link to="/kontak-media" onClick={() => setOpen(false)}>Contact & Social Media</Link>
        </motion.nav>
      )}
    </div>
  );
}

// App utama
function App() {
  return (
    <Router>
      <div className="app-frame">
        <Menu />
        <Routes>
          <Route path="/" element={<Biografi />} />
          <Route path="/projek" element={<Projek />} />
          <Route path="/projek/:slug" element={<DetailProjek />} />
          <Route path="/organisasi" element={<Organisasi />} /> {/* Rute Experience */}
          <Route path="/organisasi/:slug" element={<DetailOrganisasi />} /> {/* Rute Detail Experience */}
          <Route path="/foto-random" element={<FotoRandom />} />
          <Route path="/kontak-media" element={<KontakMedia />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;