const hubspot = require('@hubspot/api-client');
const hubspotClient = new hubspot.Client({ "apiKey": "pat-na1-a3bbbe84-9f9c-4212-a465-c6f9babc54e6" });

const hubspotFunc = (props) => {

    const SimplePublicObjectInput = { props };
    const filter = { propertyName: 'email', operator: 'EQ', value: props.email }
    const filterGroup = { filters: [filter] }
    const publicObjectSearchRequest = {
        filterGroups: [filterGroup],
    };

    const result = await hubspotClient.crm.contacts.searchApi.doSearch(publicObjectSearchRequest);
    console.log("hubspot handler:", props)

    if (result.results.length > 0) {
        // console.log("The results of the same are"+JSON.parse(result.results));
        const apiResponse = await hubspotClient.crm.contacts.basicApi.update(result.results[0].id, SimplePublicObjectInput);
    }
    else {
        const apiResponse = await hubspotClient.crm.contacts.basicApi.create(SimplePublicObjectInput);
    }

    contactid = JSON.stringify(apiResponse.id, null, 2);


}

export default hubspotFunc();