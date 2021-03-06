'use strict'

const Checkit = require('checkit')

module.exports = (bookshelf) =>
  bookshelf.model('Presence', {
    tableName: 'presences',
    student() {
      return this.belongsTo('Student', 'student_id')
    },
    attendance() {
      return this.belongsTo('Attendance', 'attendance_id')
    },
    getValidators() {
      return {
        image: ['string'],
        is_late: ['boolean'],
        status: ['string'],
        datetime: [],
        student_id: ['required', 'uuid'],
        attendance_id: ['required', 'uuid']
      }
    },
    initialize() {
      this.on('saving', this.handleSaving)
    },
    async handleSaving(model, attrs, options) {
      const checkit = new Checkit(this.getValidators(), {
        messages: {
          required: `can't be blank`
        }
      })
      await checkit.run(this.attributes, options)
    }
  })
