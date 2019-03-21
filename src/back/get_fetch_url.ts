import dateformat from 'dateformat';

export default () => {
    const today = new Date();
    const endDay = new Date();
    endDay.setDate(today.getDate() + 7);
    const end_data_range = dateformat(endDay, "yyyy-mm-dd") + "T00:00:00";
    const page = 200;
    return `https://api.meetup.com/find/upcoming_events?&sign=true&photo-host=public&lon=139.7328307&end_date_range=${end_data_range}&topic_category=292&page=${page}&radius=10&lat=35.6804054`;
}