# Indonesian Public Holidays API

A lightning-fast, highly-available JSON API and NPM Library for tracking national holidays and joint leaves (cuti bersama) in Indonesia. Use it as a standalone HTTP API or install it directly in your Node.js/TypeScript projects. Built with Hono and Cheerio.

## Features
- Fetches accurate Indonesian public holidays.
- High performance Edge caching.

## Installation

```bash
bun install
bun run dev
```

## Usage

This project can be used both as an **HTTP API** (by sending GET requests to the endpoints below) or directly inside your Node.js/TypeScript projects as an **NPM Library**.

### 1. As an NPM Library
Install the package via npm:
```bash
npm install indonesian-public-holidays
```

Example usage in your code:
```javascript
import { getHoliday, getHolidayDate } from 'indonesian-public-holidays';

// Get all holidays for 2026
const holidays = await getHoliday('2026');
console.log(holidays);
```

### 2. As an HTTP API
Base URL: `https://indonesian-public-holidays.vercel.app`

- `GET /api` : Get all holidays for the current year.
- `GET /api?year=2020` : Get all holidays for the year 2020.
- `GET /api?year=2021&month=8` : Get holidays for August 2021.
- `GET /api?year=2022&month=12&day=25` : Check if December 25, 2022 is a holiday.
- `GET /api?year=2023` : Get all holidays for the year 2023.
- `GET /api?year=2024&month=4` : Get holidays for April 2024.
- `GET /api?year=2025&month=1&day=1` : Check if January 1, 2025 is a holiday.
- `GET /api?year=2026` : Get all holidays for the year 2026.
- `GET /api/today` : Check if today is a holiday.
- `GET /api/tomorrow` : Check if tomorrow is a holiday.

### Contributing

Feel free to contribute by adding more languages or improving the time-based logic. Follow these steps:

- Fork the repository.
- Create your feature branch (git checkout -b feature/my-feature).
- Commit your changes (git commit -am 'Add some feature').
- Push to the branch (git push origin feature/my-feature).
- Create a new Pull Request.

### License

MIT

### Translations

This readme is available in:

- [English](./README.md)

## 📝 Author

👤 **Johny Lie**

- Github: [@johnylie](https://github.com/johnylie)

## 🌱 Show your support

Please ⭐️ this repository if this project helped you!

[![](https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86)](https://github.com/sponsors/johnylie)
