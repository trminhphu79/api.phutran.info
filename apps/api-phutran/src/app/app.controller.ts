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
          <title>Welcome to Phú Trần's API</title>
          <style>
              body {
                  font-family: 'Arial', sans-serif;
                  line-height: 1.6;
                  max-width: 800px;
                  margin: 0 auto;
                  padding: 20px;
                  background-color: #f5f5f5;
              }
              .container {
                  background-color: white;
                  padding: 30px;
                  border-radius: 10px;
                  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                  margin-top: 50px;
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  justify-content: center;
              }
              h1 {
                  color: #2c3e50;
                  text-align: center;
                  margin-bottom: 20px;
              }
              p {
                  color: #34495e;
                  text-align: center;
                  font-size: 1.2em;
              }
              .signature {
                  font-style: italic;
                  color: #7f8c8d;
                  text-align: right;
                  margin-top: 30px;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <h1>Welcome to Phú Trần's API</h1>
              <p>Hello guys, Welcome to my API!</p>
              <p class="signature">You don't know what you do, but I know what I do - Phú Trần (Michael Tran)</p>
              <img priority="high" src="https://phutran.info.vn/assets/logotmp.jpg" style="width: 400px; height: auto; border-radius: 10px; margin-top: 20px;" />
          </div>
      </body>
      </html>
    `;
  }
}
