import Route from '@ember/routing/route';

export default class IndexRoute extends Route {
  async model() {
    let response = await fetch('/booking_flow_data.json');
    let data = await response.json();
    return {
      activity: data.activity,
      availabilityDates: data.availabilityDates,
    };
  }
}
