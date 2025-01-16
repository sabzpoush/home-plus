export const query = `#graphql
    type Query{
        userPropertySubmited:AllProperties
        likeProperty:AllProperties

        allSale:[Sale]
        topViewedSales:[Sale]

        allRent:[Rent]
        topViewedRents:[Rent]
        filteredRent:FilteredRent

        allBuyer:[Buyer]
        filteredBuyers:FilteredBuyer
        filteredAllProperty:Json
    }
`;