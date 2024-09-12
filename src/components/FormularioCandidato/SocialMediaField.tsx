// src/components/FormularioCandidato/SocialMediaField.tsx
import React from 'react';
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube, FaEnvelope } from 'react-icons/fa';

interface SocialMediaFieldProps {
  facebook: string;
  instagram: string;
  linkedin: string;
  youtube: string;
  email: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SocialMediaField: React.FC<SocialMediaFieldProps> = ({ facebook, instagram, linkedin, youtube, email, onChange }) => {
  return (
    <div className="mb-3">
      <h4>Redes Sociais</h4>
      <div className="input-group mb-2">
        <span className="input-group-text"><FaFacebook /></span>
        <input
          type="text"
          className="form-control"
          placeholder="Facebook"
          name="facebook"
          value={facebook}
          onChange={onChange}
        />
      </div>
      <div className="input-group mb-2">
        <span className="input-group-text"><FaInstagram /></span>
        <input
          type="text"
          className="form-control"
          placeholder="Instagram"
          name="instagram"
          value={instagram}
          onChange={onChange}
        />
      </div>
      <div className="input-group mb-2">
        <span className="input-group-text"><FaLinkedin /></span>
        <input
          type="text"
          className="form-control"
          placeholder="LinkedIn"
          name="linkedin"
          value={linkedin}
          onChange={onChange}
        />
      </div>
      <div className="input-group mb-2">
        <span className="input-group-text"><FaYoutube /></span>
        <input
          type="text"
          className="form-control"
          placeholder="YouTube"
          name="youtube"
          value={youtube}
          onChange={onChange}
        />
      </div>
      <div className="input-group mb-2">
        <span className="input-group-text"><FaEnvelope /></span>
        <input
          type="email"
          className="form-control"
          placeholder="Email"
          name="email"
          value={email}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default SocialMediaField;
