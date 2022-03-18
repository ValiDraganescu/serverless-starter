import {DocParameter} from "typescript-openapi-router/dist/doc/model/parameter";
import {acceptLanguageParameter} from "./accept-language-paramter";
import {locationParameter} from "./location-parameter";

export const searchParameters: DocParameter[] = [
    acceptLanguageParameter,
    locationParameter,
    {
        ...locationParameter,
        name: 'userLocation'
    },
    {
        name: 'name',
        in: 'query',
        description: 'business name - highest priority if exists - optional',
        required: false,
        schema: {
            type: 'string'
        }
    },
    {
        name: 'distance',
        in: 'query',
        description: 'distance in meters from the given location - optional, default = 2000',
        required: false,
        schema: {
            type: 'integer'
        }
    },
    {
        name: 'customFilters',
        in: 'query',
        description: 'comma-separated - medium priority, search within reviews, businessTags based on these filters - optional',
        required: false,
        schema: {
            type: 'string'
        }
    },
    {
        name: 'category',
        in: 'query',
        description: `comma-separated categories - businesses matching one of the categories will be considered a match. 
        Available values : eat, drink, nightlife, restaurant, fast food, pub, bakery, cafe, bar, club`,
        required: false,
        schema: {
            type: 'string'
        }
    },
    {
        name: 'priceRange',
        in: 'query',
        description: 'comma-separated prices values. Price ranges from 1 to 5. 1 = cheap, 5 = expensive',
        required: false,
        schema: {
            type: 'string'
        }
    },
    {
        name: 'rating',
        in: 'query',
        description: `minimum rating
        Available values : 1, 2, 3, 4, 5`,
        required: false,
        schema: {
            type: 'integer',
            enum: [1, 2, 3, 4, 5]
        }
    },
    {
        name: 'hot',
        in: 'query',
        description: 'return only businesses that have a what\'s hot campaign',
        required: false,
        schema: {
            type: 'boolean'
        }
    },
    {
        name: 'isFavorite',
        in: 'query',
        description: 'return only businesses that are added to favorites by the user',
        required: false,
        schema: {
            type: 'boolean'
        }
    },
    {
        name: 'sortBy',
        in: 'query',
        description: `[distance/rating/relevance/pricing/featuredSearchScore],[asc/desc] - optional, default = asc
        Available values : distance, rating, relevance, pricing, featuredSearchScore`,
        required: false,
        schema: {
            type: 'string'
        }
    },
    {
        name: 'context',
        in: 'query',
        description: `Selects the context for the search`,
        required: false,
        schema: {
            type: 'string',
            enum: [
                "business",
                "friends",
                "alone",
                "couples",
                "family",
                "delivery"
            ]
        }
    },
    {
        name: 'offset',
        in: 'query',
        description: 'the number of elements to skip - optional',
        required: false,
        schema: {
            type: 'integer'
        }
    },
    {
        name: 'limit',
        in: 'query',
        description: 'the maximum number of businesses to return - optional, default = 20',
        required: false,
        schema: {
            type: 'integer'
        }
    },
    {
        name: 'countOnly',
        in: 'query',
        description: 'if true, only the matching businesses count will be returned - optional, default = false',
        required: false,
        schema: {
            type: 'boolean'
        }
    },
    {
        name: 'select',
        in: 'query',
        description: `Optional , if present will return the business elastic object only with given parameters`,
        required: false,
        schema: {
            type: 'string'
        }
    },
    {
        name: 'featuredSearch',
        in: 'query',
        description: 'Returns the featured businesses list for this location (if defined)',
        required: false,
        schema: {
            type: 'boolean'
        }
    },
    {
        name: 'top',
        in: 'query',
        description: 'Returns the 10 top list (if defined)',
        required: false,
        schema: {
            type: 'boolean'
        }
    },
    {
        name: 'ids',
        in: 'query',
        description: `List of business ids to be retrieved from the search database. Max 10 ids accepted. Ex: ids=30161,30232`,
        required: false,
        schema: {
            type: 'string'
        }
    },
    {
        name: "campaignsIds",
        in: "query",
        description: "List of ids for campaigns that have to be retrieved from the search database. Ex: campaignIds=1,7,23",
        required: false,
        schema: {
            type: 'string'
        }
    },
    {
        name: "showAllCampaigns",
        in: "query",
        description: "return all existing campaigns in businesses - optional",
        required: false,
        schema: {
            type: "boolean",
        }
    },
    {
        name: "hasTodaySpecial",
        in: "query",
        description: "filters out all businesses that do not have a today special - optional",
        required: false,
        schema: {
            type: "boolean"
        }
    },
    {
        name: "recommend",
        in: "query",
        description: "return searched businesses based on recommendations - optional",
        required: false,
        schema: {
            type: "boolean"
        }
    },
    {
        name: "hasDeliveryLink",
        in: "query",
        description: "filters out all businesses that do not have a delivery link - optional",
        required: false,
        schema: {
            type: "boolean"
        }
    },
    {
        name: "hasReservations",
        in: "query",
        description: "returns only the businesses that have a reservations link - optional",
        required: false,
        schema: {
            type: "boolean"
        }
    },
    {
        name: "fullTextSearch",
        in: "query",
        description: "Parameter that contains the user query in plain text",
        required: false,
        schema: {
            type: "string"
        }
    }

]