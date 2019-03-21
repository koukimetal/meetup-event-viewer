require('dotenv').config();
import fetchURL from './get_fetch_url';
import axios from 'axios';
import fs from 'fs-extra';
(async () => {
    const {MEETUP_API_KEY} = process.env;
    const url = fetchURL() + "&key=" + MEETUP_API_KEY;
    const result = await axios.get(url);
    await fs.mkdirp('./dist/');
    await fs.writeFile('./dist/events.json', JSON.stringify(result.data, null, 4));
})();
