class APIQueryer {
    constructor(base, url, limit) {
        this.base = base,
        this.url = url,
        this.limit = limit
        this.previous = ''
    }

    createQuery() {
        return `${this.base}${this.url}?limit=${this.limit}&after=${this.previous}`
    }

    fetchTop() {
        return new Promise((resolve, reject) => {
            const query = this.createQuery()
            fetch(query)
                .then((res) => { return res.json() })
                .then(({data}) => {
                    const after = data.after
                    this.updatePrevious(after)
                    resolve(data.children)
                }).catch((err) => {
                    console.error(err)
                    reject(err)
                })
        })
    }

    updatePrevious(id) {
        this.previous = id
    }
}

export default APIQueryer
