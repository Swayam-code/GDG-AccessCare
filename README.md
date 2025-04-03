# AccessCare

A modern healthcare platform that connects patients with doctors for remote consultations, appointment management, and medical services.

## 📑 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

- **Patient Portal**
  - Schedule and manage appointments
  - Access medical records
  - Teleconsultation with doctors
  - AI-powered health assistant
  - Disease prediction tools
  - Health education resources

- **Doctor Portal**
  - Manage patient appointments
  - View patient medical histories
  - Issue prescriptions
  - Conduct virtual consultations
  - Manage patient database

- **Core Functionality**
  - User authentication & authorization
  - Secure medical data management
  - Real-time video consultations
  - Responsive UI for all devices

## 🛠️ Tech Stack

- **Frontend**: Next.js, TypeScript, TailwindCSS
- **Authentication**: JWT-based auth system
- **UI Components**: Custom components with TailwindCSS
- **Deployment**: Vercel

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/Swayam-code/GDG-AccessCare.git
   cd GDG-AccessCare
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
/
├── public/            # Static assets
├── src/
│   ├── app/           # Next.js App Router files
│   │   ├── dashboard/ # Dashboard pages for patients and doctors
│   │   ├── login/     # Authentication pages
│   │   └── ...        # Other app routes
│   ├── components/    # Reusable UI components
│   └── middleware.ts  # Next.js middleware
├── .gitignore         # Git ignore file
├── next.config.ts     # Next.js configuration
├── package.json       # Project dependencies
├── tailwind.config.ts # Tailwind CSS configuration
└── tsconfig.json      # TypeScript configuration
```

## 🖼️ Screenshots

The application includes various features such as:

- Landing page with service information
- Patient and doctor dashboards
- Teleconsultation interface
- Health monitoring tools
- Appointment management system

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.
