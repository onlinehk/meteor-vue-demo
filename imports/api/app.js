import { Links } from '/lib/collections';

export const meteors = {
    meteor: {
        // Subscriptions
        $subscribe: {
            // We subscribe to the 'links' publication
            'links': []
        },
        links() {
            if (this.search) {
                return Links.find({ "title": { $regex: new RegExp(this.search, "i") } }, { sort: { createdAt: -1 } }).fetch()
            } else {
                var rtn = Links.find({}, { sort: { createdAt: -1 } }).fetch();
                for (const key in rtn) {
                    if (rtn[key].createdAt) {
                        rtn[key].createdAt = this.formatDate(rtn[key].createdAt);
                    }
                    if (rtn[key].updatedAt) {
                        rtn[key].updatedAt = this.formatDate(rtn[key].updatedAt);
                    }
                }
                return rtn;
            }
        }
    }
}