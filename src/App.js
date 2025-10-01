import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

function Menu() {
  return (
    <nav className="top-menu">
      <Link to="/">Biography</Link>
      <Link to="/projek">Project</Link>
      <Link to="/organisasi">Experience</Link>
      <Link to="/foto-random">Random Photos</Link>
      <Link to="/kontak-media">Contant & Social Media</Link>
    </nav>
  );
}

function Biografi() {
  return (
    <>
      <h1 className="page-title">Biography</h1>
      <div className="welcome-header">
        <h1>Welcome</h1>
        <p className="subtitle">Welcome to my personal page.</p>
      </div>

      <div className="top-section">
        <div className="photo-section">
          <img src="contoh.jpg" alt="Foto Naufal Najib" />
        </div>
        <div className="about-section">
          <h2>About Me</h2>
          <p><strong>Name:</strong> Naufal Najib</p>
          <p><strong>Date of Birth:</strong> Bantul, 18 October 2004</p>
          <p><strong>Study Program:</strong> Instrumentation and Control Engineering Technology</p>
          <p><strong>Departemen:</strong> Electrical Engineering and Informatics</p>
          <p><strong>Faculties:</strong> Vocational School, Gadjah Mada Univercity</p>
        </div>
      </div>

      <div className="bio-section">
        <h2>A Short Story About Me</h2>
        <p>
          Saya adalah mahasiswa aktif yang memiliki minat besar dalam bidang kontrol, instrumentasi, dan otomasi.
          Saya senang mempelajari teknologi baru, terutama yang berkaitan dengan sistem tertanam, pengendali logika fuzzy,
          serta pengembangan sistem berbasis mikrokontroler dan IoT.
          Dalam keseharian, saya terbiasa bekerja secara terstruktur dan senang menyelesaikan tantangan teknis.
        </p>
      </div>
    </>
  );
}

function Projek() {
  return (
    <div>
      <h1 className="page-title">Project</h1>
      <ol>
        {/* Daftar projek (dipersingkat tampilannya) */}
        <li><h3>Line Follower Robot</h3><p>Robot mengikuti garis dengan sensor dan driver.</p></li>
        <li><h3>Autonomous Surface Vehicle (ASV)</h3><p>Kapal prototipe yang dapat bergerak otonom menggunakan GPS dan kamera.</p></li>
        <li><h3>Autonomous Underwater Vehicle (AUV)</h3><p>Prototipe kendaraan bawah air otonom berbasis kamera.</p></li>
        <li><h3>Watermelon Monitoring</h3><p>Sistem monitoring semangka berbasis ESP32 dan IoT.</p></li>
        <li><h3>Precise Leaf Meter with AI</h3><p>Deteksi luas daun menggunakan YOLO dan Qt GUI.</p></li>
        <li><h3>Buck Converter</h3><p>Konverter tegangan DC step-down dengan filter dan pencacah.</p></li>
        <li><h3>7-bit SAR ADC</h3><p>Analog-to-digital converter dengan metode successive approximation.</p></li>
        <li><h3>Fuzzy Logic Controller</h3><p>Kendali motor berbasis logika fuzzy.</p></li>
        <li><h3>Line Follower Simulation in MATLAB</h3><p>Simulasi robot line follower menggunakan MATLAB.</p></li>
        <li><h3>Dimmer Circuit</h3><p>Pengatur intensitas cahaya menggunakan TRIAC atau PWM.</p></li>
        <li><h3>Rangkaian </h3><p>deskirpsi</p></li>
      </ol>
    </div>
  );
}

function Organisasi() {
  return (
    <div>
      <h1 className="page-title">Experience</h1>
      <ol>
        <li>
          <h3>Gamantaray (Gadjah Mada Naval and Marine Riset Activity)</h3>
          <p>
            Gamantaray adalah organisasi riset kemaritiman di Universitas Gadjah Mada yang fokus pada pengembangan
            teknologi dan inovasi di bidang kelautan dan perkapalan. Organisasi ini menjadi wadah bagi mahasiswa yang
            tertarik pada dunia riset maritim, seperti desain kapal, autonomous underwater vehicle (AUV), robot bawah
            air, sistem navigasi laut, dan teknologi kelautan lainnya. Selain melakukan riset dan pengembangan, Gamantaray
            juga aktif mengikuti berbagai kompetisi nasional dan internasional.
          </p>
        </li>
      </ol>
    </div>
  );
}

function FotoRandom() {
  return (
    <div>
      <h1 className="page-title">Random Photos</h1>
      <div className="random-photos">
        <img src="foto random.jpg" alt="Foto Random " />
        <img src="foto random 1.jpg" alt="Foto Random 1" />
      </div>
    </div>
  );
}

function KontakMedia() {
  return (
    <div>
      <h1 className="page-title">Contact and Social Media</h1>
      <p>oijoernforefn.</p>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="app-frame">
        <Menu />
        <Routes>
          <Route path="/" element={<Biografi />} />
          <Route path="/projek" element={<Projek />} />
          <Route path="/organisasi" element={<Organisasi />} />
          <Route path="/foto-random" element={<FotoRandom />} />
          <Route path="/kontak-media" element={<KontakMedia />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
