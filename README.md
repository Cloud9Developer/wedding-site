# Wedding Website
An open‑source, fully static wedding website that you can host anywhere (GitHub Pages, Netlify, Vercel, etc.).
It includes a responsive design, engagement photo slider, RSVP form backed by Google Sheets, calendar links, YouTube background video, Google Map toggle, and more.

# Highlights
1. Slick and fully **responsive** design.
2. **RSVP feature** which directly uploads data to a Google sheet.
3. **Receive email alerts** when someone RSVPs.
4. **Add to Calendar** feature which supports four different calendars.
5. A nice **YouTube video** showing your venue.
6. **Google Map** showing your venue's location.
7. Start and run the website **completely free**. No hosting, backend server, or database required – just host the files and use Google Sheets for RSVP data.

# Getting Started
1. `$ git clone <repository‑url>` – clone the repository.
2. `$ cd wedding-website` - go inside the project directory
3. `$ npm install` - install dependencies
4. `$ gulp` - compile sass to css, minify js, etc.
5. That's it – open `index.html` in your browser or serve the folder with any static server.

## Customization
The site is designed to be easily customized without modifying core code:

| Item | Where to edit | How |
|------|---------------|-----|
| **Dates & Times** | `js/scripts.js` | Update the `start` and `end` `Date` objects.
| **RSVP Google Sheet** | `js/scripts.js` | Replace the `sheetID` and the `GAS_URL` constants.
| **Engagement Photos** | `img/eng_pics/` | Add JPEG/PNG files and run `gulp generate-pics` to rebuild `img/eng_pics.json`.
| **CSS Theme** | `sass/styles.scss` | Modify colors, fonts, and layout in the SCSS file and recompile with `gulp sass`.
| **Google Map Address** | `index.html` | Update the `src` of the iframe or the `data-address` attribute.
| **Social Links / Contact** | `index.html` | Edit the `href` attributes in the footer.

Run `gulp` after any change to rebuild assets.

## License
This project is released under the **GPL‑3.0** license. See the [LICENSE](LICENSE) file for details.

## Troubleshooting
| Symptom | Likely Cause | Fix |
|---------|--------------|-----|
| `npm install` fails | Missing Node 14+ | Install Node 16+ from [nodejs.org](https://nodejs.org/).
| `gulp` hangs | Python 3 missing | Install Python 3 and add it to PATH.
| RSVP form does not submit | Incorrect Google Sheets ID or Apps Script URL | Double‑check the constants in `js/scripts.js`.
| Images not loading | `generateEngPics.js` not run | Run `node generateEngPics.js` or `gulp generate-pics`.

## Documentation
The original project included a blog post describing all the features and how to customize them. You can still refer to it at:
[Blog post](https://blog.rampatra.com/wedding-website).
