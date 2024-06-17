# Cahenom Ngaji

Cahenom Ngaji is a web application for reading the Qur'an, displaying prayer times based on the user's location, and providing daily prayers. This application is built using Next.js for the frontend, Prisma as the ORM for database management, and the REST API from equran.id to fetch Qur'an surah data.

## Features

- Displaying a list of surahs
- Displaying surah details
- Displaying prayer times based on user location
- Displaying daily prayers
- Responsive and user-friendly user interface

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework for web application development
- [Prisma](https://www.prisma.io/) - ORM for database management
- [equran.id API](https://equran.id/api/v2/surat) - API to fetch Qur'an surah data
- [Fatimah API](https://api.myquran.com/v2) - API to fetch prayer times

## Prerequisites

Make sure you have installed the following before starting:

- Node.js (latest version recommended)
- npm or yarn (package manager)

## Installation
1. Clone the repository:
   ```bash
   https://github.com/adhinnnugroho/CAHNOMNGAJI.git
   
2. Navigate to the project directory:
   ```bash
   cd CahenomNgaji

3. Install dependencies:
   ```bash
   npm install

4. Set up the environment variables in a .env.local file
   ```bash
   REST_API_URL=https://equran.id/api/v2/surat
   REST_API_URL_CITY=https://waktu-sholat.vercel.app/location
   REST_API_URL_SCHEDULE=https://api.myquran.com/v2
   REST_API_URL_DOA=https://api.dikiotang.com/  

5. Run the application:
   ```bash
   npm run dev

## Usage

1. Open your browser and navigate to http://localhost:3000/
2. Explore the list of surahs and other features available.

## Contributing
Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (git checkout -b feature-branch).
3. Make your changes and commit them (git commit -m 'Add some feature').
4. Push to the branch (git push origin feature-branch).
5. Open a Pull Request.
   
## License
This project is licensed under the MIT License.

## Contact
For any inquiries, feel free to reach out to me via <a href="https://www.linkedin.com/in/adhinnnugroho/">LinkedIn</a> or <a href="mailto:adhinnnugroho@gmail.com">Email</a>.


