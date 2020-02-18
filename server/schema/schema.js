const graphql = require("graphql");
const Security = require("../models/security");
const Holding = require("../models/holding");
const PricingHistory = require("../models/pricingHistory");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLFloat,
  GraphQLList,
  GraphQLNonNull
} = graphql;

const SecurityType = new GraphQLObjectType({
  name: "Security",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    ticker: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    assetClass: { type: new GraphQLNonNull(GraphQLString) },
    priceHistory: {
      type: new GraphQLList(PriceHistoryType),
      resolve(parent, args) {
        return PricingHistory.find({ securityId: parent.id });
      }
    },
    latestPrice: {
      type: PriceHistoryType,
      resolve(parent, args) {
        return PricingHistory.find({ securityId: parent.id })
          .sort("-date")
          .findOne();
      }
    }
  })
});

const getCurrentValue = async (securityId, shares) => {
  const price = await PricingHistory.find({ securityId })
    .sort("-date")
    .findOne();

  if (price) {
    return price.pricePerShare * shares;
  } else {
    return null;
  }
};

const HoldingType = new GraphQLObjectType({
  name: "Holding",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    security: {
      type: SecurityType,
      resolve(parent, args) {
        return Security.findById(parent.securityId);
      }
    },
    shares: { type: new GraphQLNonNull(GraphQLFloat) },
    currentValue: {
      type: GraphQLFloat,
      resolve: async (parent, args) => {
        const shares = parent.shares;
        if (!shares) {
          return shares;
        }

        return await getCurrentValue(parent.securityId, parent.shares);
      }
    }
  })
});

const PriceHistoryType = new GraphQLObjectType({
  name: "PriceHistory",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    security: {
      type: SecurityType,
      resolve(parent, args) {
        return Security.findById(parent.securityId);
      }
    },
    date: { type: new GraphQLNonNull(GraphQLString) },
    pricePerShare: { type: new GraphQLNonNull(GraphQLFloat) }
  })
});

//todo make date a custom scalar type

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    security: {
      type: SecurityType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        return Security.findById(args.id);
      }
    },

    securities: {
      type: new GraphQLList(SecurityType),
      args: {},
      resolve(parent, args) {
        return Security.find();
      }
    },

    holding: {
      type: HoldingType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        return Holding.findById(args.id);
      }
    },

    holdings: {
      type: new GraphQLList(HoldingType),
      args: {},
      resolve(parent, args) {
        return Holding.find();
      }
    },

    prices: {
      type: new GraphQLList(PriceHistoryType),
      args: {},
      resolve(parent, args) {
        return PricingHistory.find();
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addSecurity: {
      type: SecurityType,
      args: {
        ticker: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        assetClass: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        let security = new Security({
          ticker: args.ticker,
          name: args.name,
          assetClass: args.assetClass
        });

        return security.save();
      }
    },

    addHolding: {
      type: HoldingType,
      args: {
        securityId: { type: new GraphQLNonNull(GraphQLID) },
        shares: { type: new GraphQLNonNull(GraphQLFloat) }
      },
      resolve(parent, args) {
        let holding = new Holding({
          securityId: args.securityId,
          shares: args.shares
        });

        return holding.save();
      }
    },

    addPrice: {
      type: PriceHistoryType,
      args: {
        securityId: { type: new GraphQLNonNull(GraphQLID) },
        date: { type: new GraphQLNonNull(GraphQLString) },
        pricePerShare: { type: new GraphQLNonNull(GraphQLFloat) }
      },
      resolve(parent, args) {
        let pricingHistory = new PricingHistory({
          securityId: args.securityId,
          date: args.date,
          pricePerShare: args.pricePerShare
        });

        return pricingHistory.save();
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
