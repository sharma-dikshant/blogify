class APIFeatures {
  constructor(query, reqQuery) {
    this.query = query;
    this.reqQuery = reqQuery;
  }
  filter() {
    if (this.reqQuery.author) {
      const authorRegx = new RegExp(`${this.reqQuery.author}`, "i");
      this.query = this.query.find({ author: authorRegx });
    }

    if (this.reqQuery.title) {
      const titleRegx = new RegExp(`${this.reqQuery.title}`, "i");
      this.query = this.query.find({ title: titleRegx });
    }

    if (this.reqQuery.tags) {
      const tags = this.reqQuery.tags.split(",");
      this.query = this.query.find({ tags: { $in: tags } });
    }
    if (this.reqQuery.category) {
      const category = this.reqQuery.category.split(",");
      this.query = this.query.find({ category: { $in: category } });
    }

    return this;
  }

  sort() {
    if (this.reqQuery.sort) {
      let sortQuery;
      if (this.reqQuery.sort == "1") {
        //ascending
        sortQuery = "createdAt updatedAt";
      } else if (this.reqQuery.sort == "-1") {
        //descending
        sortQuery = "-createdAt -updatedAt";
      }

      this.query = this.query.sort(sortQuery);
    }

    return this;
  }

  limitFields() {
    if (this.reqQuery.fields) {
      const fields = this.reqQuery.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    }

    return this;
  }

  paginate() {
    const page = this.reqQuery.page * 1 || 1;
    const limit = this.reqQuery.limit * 1 || 10;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

module.exports = APIFeatures;
