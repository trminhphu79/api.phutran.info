import { Controller, Get, Header } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  @Header('Content-Type', 'text/html')
  getHello(): string {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Phú Trần's API</title>
          <link rel="icon" type="image/x-icon" href="logotmp.ico" />
          <style>
              :root {
                  --primary-color: #2c3e50;
                  --secondary-color: #34495e;
                  --accent-color: #3498db;
                  --background-color: #f5f5f5;
                  --card-background: #ffffff;
                  --text-color: #2c3e50;
                  --signature-color: #7f8c8d;
              }

              * {
                  margin: 0;
                  padding: 0;
                  box-sizing: border-box;
              }

              body {
                  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
                  line-height: 1.6;
                  background-color: var(--background-color);
                  color: var(--text-color);
                  min-height: 100vh;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  padding: 20px;
              }

              .container {
                  background-color: var(--card-background);
                  padding: 2.5rem;
                  border-radius: 15px;
                  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
                  max-width: 800px;
                  width: 100%;
                  animation: fadeIn 0.6s ease-out;
                  transition: transform 0.3s ease;
                  display: flex;
                  flex-direction: column;
                  align-items: center;
              }

              .container:hover {
                  transform: translateY(-5px);
              }

              h1 {
                  color: var(--primary-color);
                  text-align: center;
                  margin-bottom: 1.5rem;
                  font-size: 2.5rem;
                  font-weight: 700;
                  position: relative;
                  padding-bottom: 1rem;
              }

              h1::after {
                  content: '';
                  position: absolute;
                  bottom: 0;
                  left: 50%;
                  transform: translateX(-50%);
                  width: 60px;
                  height: 4px;
                  background-color: var(--accent-color);
                  border-radius: 2px;
              }

              p {
                  color: var(--secondary-color);
                  text-align: center;
                  font-size: 1.25rem;
                  margin: 1rem 0;
                  line-height: 1.8;
              }

              .signature {
                  font-style: italic;
                  color: var(--signature-color);
                  text-align: right;
                  margin: 1.5rem 0;
                  font-size: 1.1rem;
                  align-self: flex-end;
              }

              .logo-image {
                  width: 400px;
                  height: auto;
                  border-radius: 10px;
                  margin-top: 20px;
                  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
                  transition: transform 0.3s ease;
              }

              .logo-image:hover {
                  transform: scale(1.02);
              }

              @keyframes fadeIn {
                  from {
                      opacity: 0;
                      transform: translateY(20px);
                  }
                  to {
                      opacity: 1;
                      transform: translateY(0);
                  }
              }

              @media (max-width: 768px) {
                  .container {
                      padding: 1.5rem;
                      margin: 1rem;
                  }

                  h1 {
                      font-size: 2rem;
                  }

                  p {
                      font-size: 1.1rem;
                  }

                  .logo-image {
                      width: 100%;
                      max-width: 300px;
                  }
              }

              @media (max-width: 480px) {
                  h1 {
                      font-size: 1.75rem;
                  }

                  p {
                      font-size: 1rem;
                  }

                  .container {
                      padding: 1.25rem;
                  }

                  .logo-image {
                      max-width: 250px;
                  }
              }

              @media (prefers-color-scheme: dark) {
                  :root {
                      --primary-color: #ecf0f1;
                      --secondary-color: #bdc3c7;
                      --background-color: #2c3e50;
                      --card-background: #34495e;
                      --text-color: #ecf0f1;
                      --signature-color: #95a5a6;
                  }

                  .container {
                      box-shadow: 0 10px 30px rgba(0,0,0,0.3);
                  }

                  .logo-image {
                      box-shadow: 0 5px 15px rgba(0,0,0,0.3);
                  }
              }
          </style>
      </head>
      <body>
          <div class="container">
              <h1>Welcome to Phú Trần's API</h1>
              <p>Hello guys, Welcome to my API!</p>
              <p class="signature">Let's make our life better than yesterday - Phú Trần (Michael Tran)</p>
              <img 
                  class="logo-image"
                  priority="high" 
                  src="https://phutran.info.vn/assets/logotmp.jpg" 
                  alt="Phú Trần Logo"
              />
          </div>
      </body>
      </html>
    `;
  }
}
