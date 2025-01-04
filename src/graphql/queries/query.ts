export const query = `#graphql
    type Query{
        userPropertySubmited:AllProperties
        likeProperty:AllProperties

        allSale:[Sale]
        topViewedSales:[Sale]
        newSales:[Sale]

        allRent:[Rent]
        topViewedRents:[Rent]
        newRents:[Rent]
        filteredRent:FilteredRent
    }
`;