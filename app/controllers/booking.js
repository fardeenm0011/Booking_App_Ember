
import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class BookingController extends Controller {
    @service router;
    @service store;


    selectedName = "Zoey Tomster";
    selectedEmail = "ember.luvr@gmail.com";
    selectedPhone = "1-415-555-5555";
    selectedTicket = null;
    selectedCurrency = "$5.00";
    selectedTime = "8:00 AM";
    selectedDate = null;
    status = null;
    times = null;
    

    @action
    ticketSelected(activityId, event) {
        const selectedActivity = this.model.activity.find(activity => activity.id === activityId);
        
        if (!selectedActivity) {
            return;
        }
    
        this.selectedTicket = selectedActivity.tickets.find(ticket => ticket.id === event.target.value);
        if (!this.selectedTicket) {
            return;
        }
        this.set('amount', this.selectedTicket.price.amount);
        this.set('currency', this.selectedTicket.price.currency);
        this.set('formatted', this.selectedTicket.price.formatted);
        this.set('ticketDetails', activityId);
    }
    @action
    currencySelected(event) {
        this.selectedCurrency = event.target.value;
    }
    @action
    timeSelected(event) {
        this.selectedTime = event.target.value;
    }
    @action
    dateSelected(activityId, event) {
        this.selectedDate = event.target.value;
        
        let availabilityDates = this.model.availabilityDates;
        const selectedAvailabilityDate = availabilityDates.find(date => date.date === this.selectedDate);
        if (selectedAvailabilityDate) {
            this.set('times', selectedAvailabilityDate.availabilityTimes.map(slot => slot.time));
        } else {
            this.set('times', null);
        }
        
        if (selectedAvailabilityDate) {
            this.status = selectedAvailabilityDate.status;
        }
        this.set('timeshow', activityId);
    }

    @action
    OpenModal() {
        this.set('showModal', true);
        this.set('selectedModalTicket', this.selectedTicket);
        this.set('selectedModalCurrency', this.selectedCurrency);
        this.set('selectedModalTime', this.selectedTime);
        this.set('selectedModalDate', this.selectedDate);
        this.set('selectedModalName', this.selectedName);
        this.set('selectedModalEmail', this.selectedEmail);
        this.set('selectedModalPhone', this.selectedPhone);
    }

    @action
    cancelModal() {
        this.set('showModal', false);
    }
    confirmBooking = () => {
        this.set('showModal', false);
        const booking = this.store.createRecord('booking', {
            activityId: this.selectedModalTicket,
            reservationStatus: 'confirmed', 
            date: this.selectedModalDate,
            time: this.selectedModalTime,
            tickets: [
                {
                    ticketId: this.selectedModalTicket,
                    reservationStatus: 'confirmed', 
                }
            ],
            primaryGuest: {
                name: this.selectedModalName,
                email: this.selectedModalEmail, 
                phone: this.selectedModalPhone, 
            }
        });
        booking.save().then(() => {
            // Handle success
            console.log('Booking saved successfully:', booking);
        }).catch((error) => {
            // Handle error
            console.error('Error saving booking:', error);
        });

        const bookingData = {
            id: booking.id,
            activityId: booking.activityId,
            reservationStatus: booking.reservationStatus,
            date: booking.date,
            time: booking.time,
            // tickets: booking.tickets.toArray().map(ticket => {
            //     return {
            //         ticketId: ticket.ticketId,
            //         reservationStatus: ticket.reservationStatus
            //     };
            // }),
            primaryGuest: {
                name: booking.primaryGuest.name,
                email: booking.primaryGuest.email,
                phone: booking.primaryGuest.phone
            }
        };
    
        alert(JSON.stringify(bookingData, null, 2));
    }
}
   
