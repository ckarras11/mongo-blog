const mongoose = require('mongoose')

//schema
const postSchema = mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true }
    },
    created: Date
});
//virtual author
postSchema.virtual('authorName').get(function () {
    return (`${this.author.firstName} ${this.author.lastName}`.trim())
})
//apiRepr
postSchema.methods.apiRepr = function () {
    return {
        id: this._id,
        title: this.title,
        content: this.content,
        author: this.authorName,
        created: this.created
    }
}
const Post = mongoose.model('Post', postSchema, "Post");
module.exports = {Post};