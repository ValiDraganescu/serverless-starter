import {SearchBusinessesRequest} from "@api/api-interface";
import {Response} from "typescript-openapi-router";
import axios from "axios";
import {Logger} from "@xtool/logger";
const logger = new Logger("searchWithWikoitOldAPI");

export const searchImplementation = async (request: SearchBusinessesRequest): Promise<Response<any>> => {
    logger.log(`getting results from old api`);
    const oldSearchResult = await axios.get('https://someapi.com/search',
        {
            params: request.queryParams,
            headers: {
                'Authorization': 'Bearer ' + request.headers['Authorization'],
                'Accept-Language': request.headers['Accept-Language'],
                'x-api-key': request.headers['x-api-key'],
            }
        });
    const hasWikotiReservations = request.queryParams.hasWikotiReservations;
    let data = oldSearchResult.data;
    logger.log(`Got ${data.count} results from the old someapi API`);
    if (hasWikotiReservations) {
        logger.log(`Filtering results with some api reservations`);
        data.value = data.value.filter(business => {
            const hasBookingContacts = business.bookingContacts && business.bookingContacts.length > 0;
            const hasWikotiReservation = business.bookingContacts.find(contact => contact.link && contact.link.includes('some'));
            return hasBookingContacts && hasWikotiReservation;
        });
        data.count = data.value.length;
        logger.log(`Filtered results to ${data.count} businesses`);
        for (const business of data.value) {
            logger.log(`Business ${business.name} has ${JSON.stringify(business.bookingContacts)} contacts`);
        }
    }
    return new Response().setBody(data);
}