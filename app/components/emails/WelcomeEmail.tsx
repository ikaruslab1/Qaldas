import * as React from 'react';

interface WelcomeEmailProps {
  firstName: string;
}

export const WelcomeEmail: React.FC<Readonly<WelcomeEmailProps>> = ({
  firstName,
}) => (
  <div style={{
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    backgroundColor: '#0a0a0a',
    color: '#ffffff',
    padding: '40px 20px',
  }}>
    <div style={{
      maxWidth: '600px',
      margin: '0 auto',
      backgroundColor: '#111',
      borderRadius: '12px',
      padding: '40px',
      border: '1px solid #222',
      boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
    }}>
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 style={{ margin: 0, fontSize: '28px', fontWeight: 'bold', color: '#fff' }}>
          Bienvenido a <span style={{ color: '#fedd00' }}>Qaldas</span>
        </h1>
      </div>
      
      <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#a3a3a3', marginTop: 0 }}>
        Hola <strong style={{ color: '#fff' }}>{firstName}</strong>,
      </p>
      
      <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#a3a3a3' }}>
        Estamos encantados de tenerte con nosotros. Has completado exitosamente tu registro en nuestra plataforma de vanguardia.
      </p>

      <div style={{ 
        backgroundColor: '#1a1a1a', 
        padding: '24px', 
        borderRadius: '8px', 
        borderLeft: '4px solid #fedd00',
        margin: '32px 0' 
      }}>
        <p style={{ margin: 0, color: '#e5e5e5', fontSize: '15px' }}>
          Ya puedes acceder a tu perfil y configurar tu espacio de trabajo para comenzar a conectar y crecer en la red académica de Qaldas.
        </p>
      </div>

      <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#a3a3a3' }}>
        Si tienes alguna pregunta, no dudes en responder a este correo.
      </p>

      <div style={{ marginTop: '48px', paddingTop: '24px', borderTop: '1px solid #333', textAlign: 'center' }}>
        <p style={{ fontSize: '12px', color: '#666', margin: 0 }}>
          &copy; {new Date().getFullYear()} Qaldas. Todos los derechos reservados.
        </p>
        <p style={{ fontSize: '12px', color: '#666', marginTop: '8px' }}>
          Mérida, Yucatán, México
        </p>
      </div>
    </div>
  </div>
);

export default WelcomeEmail;
