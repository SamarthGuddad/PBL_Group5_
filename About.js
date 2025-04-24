import React from 'react';
import './About.css'; // Create this CSS file

const About = () => {
  const teamMembers = [
    {
      name: 'Gaurav Gaware',
      role: 'Frontend Developer',
      bio: 'Passionate about creating seamless user experiences and solving complex problems with code.',
      linkedin: '#', // Add LinkedIn profile URL
      github: '#',   // Add GitHub profile URL
      //image: 'https://via.placeholder.com/150/FFC107/000000?Text=Alice', // Placeholder image URL
    },
    {
      name: 'Prajwal Dube',
      role: 'Frontend Developer',
      bio: 'Passionate about creating seamless user experiences and delivering projects on time and within scope.',
      linkedin: '#',
      behance: '#',  // Add Behance profile URL
      //image: 'https://via.placeholder.com/150/4CAF50/FFFFFF?Text=Bob', // Placeholder image URL
    },
    {
      name: 'Samarth Guddad',
      role: 'Backend Developer',
      bio: 'Focused on developing effective Backend .',
      linkedin: '#',
      //image: 'https://via.placeholder.com/150/2196F3/FFFFFF?Text=Charlie', // Placeholder image URL
    },
    {
      name: 'Digvijay',
      role: 'JavaScript Developer',
      bio: 'Committed to producing engaging and informative content that resonates with our audience.',
      linkedin: '#',
      twitter: '#',  // Add Twitter profile URL
      //image: 'https://via.placeholder.com/150/F44336/FFFFFF?Text=Diana', // Placeholder image URL
    },
  ];

  return (
    <div className="about-us-container">
      <section className="our-story">
        <h2>Our Story</h2>
        <p>
          We are a team of four individuals who came together with a shared vision and passion for Developing Kid's Learning Portal. Our journey began as PBL Project.
        </p>
        <p>
          Driven by our diverse skills and complementary expertise. We believe in Collabrative work.
        </p>
        <p>
          Through collaboration, dedication, and a lot of hard work, we are excited to bring Kid's Learning portal to life. We are constantly learning and evolving, and we are committed to providing Learning to Kid.
        </p>
      </section>

      <section className="our-team">
        <h2>Meet Our Team</h2>
        <div className="team-members-grid">
          {teamMembers.map((member, index) => (
            <div key={index} className="team-member-card">
              <div className="member-image">
                <img src={member.image} alt={member.name} />
              </div>
              <h3>{member.name}</h3>
              <h4>{member.role}</h4>
              <p className="member-bio">{member.bio}</p>
              <div className="social-links">
                {member.linkedin && <a href={member.linkedin} target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin"></i></a>}
                {member.github && <a href={member.github} target="_blank" rel="noopener noreferrer"><i className="fab fa-github"></i></a>}
                {member.behance && <a href={member.behance} target="_blank" rel="noopener noreferrer"><i className="fab fa-behance"></i></a>}
                {member.twitter && <a href={member.twitter} target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>}
                {/* Add more social media links as needed */}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="our-values">
        <h2>Our Core Values</h2>
        <ul>
          <li>Collaboration: We believe in the power of teamwork and open communication.</li>
          <li>Innovation: We strive to create new and effective solutions.</li>
          <li>User-Centricity: Our users are at the heart of everything we do.</li>
          <li>Quality: We are committed to delivering high-quality work.</li>
          {/* Add more of your team's core values */}
        </ul>
      </section>
    </div>
  );
};

export default About;