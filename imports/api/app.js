import { Links } from '/lib/collections';

export const meteors = {
    meteor: {
        // Subscriptions
        $subscribe: {
            // We subscribe to the 'links' publication
            'links': function () {
                return [this.limit, this.search];
            }
        },
        links() {
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