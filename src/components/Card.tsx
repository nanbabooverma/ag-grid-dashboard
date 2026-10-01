import React from "react";

interface CardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: React.ReactNode;
}

const Card = ({ title, value, subtitle, icon }: CardProps) => {
  return (
    <div className="card">
      <div className="card-top">
        <div>
          <p className="card-title">{title}</p>
          <h2>{value}</h2>
        </div>

        <div className="card-icon">{icon}</div>
      </div>

      <p className="card-subtitle">{subtitle}</p>
    </div>
  );
};

export default Card;
