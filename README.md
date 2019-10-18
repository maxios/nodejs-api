public api for sheikh alamoud official website

Setup:

      npm i
      npm i -g sequelize-cli
      sequelize db:create
      sequelize db:migrate

ORM console:

      cd <PROJECT_ROOT_PATH>
      node console.js

ORM console usage:

  fetch all data:

      MODEL.findAll({raw: true}).then(console.log).catch(console.log)

  create record:

      Model.create({<attributes written here>}).then(console.log).catch(console.log)

API Endpoints:

# GET Sessions

      GET /api/sessions
      // mainly these params for filteration purpose
      Params: {
        days: Array (optional)
        location_ids: <Array>String (optional)
        system_ids: <Array>String (optional)
        tag_ids: <Array>String (optional)
        tag_names: <Array>String (optional)
        rwaq_id: String (optional)
      }
      Response: <Array>object
        [{
          uid: string,
          name: string,
          description: longText,
          days: array,
          start_time: timestamp,
          end_time: timestamp,
          start_date: datetime,
          end_date: datetime,
          system: string,
          location: string,
          soundcloud_url: string,
          youtube_url: string,
          google_url: string,
          book: name,
          cost: float,
          payment_url: string,
          sciences: array,
          duration: integer // duration in minutes
        }]


# Get Systems

      GET /api/systems
      Params: {}
      Response: Array
        [{
          uid: string,
          name: string,
          description: longText
        }]

# GET Instructors

      GET /api/instructors
      params: {}
      Response: Array
        [{
          uid: string, // unique id
          name: string, // name of the instructor
          avatar: string, // personal image link of the instructor
          status: int, // 0 = previous instructor, 1 = current instructor
          order: int // first in order is the smallest number
        }]

# GET specific instructor

      GET /api/instructors/:uid
      params: {}
      Response: object
        {
          uid: string,
          name: string,
          avatar: string,
          sessions: <Array>
            [{
              uid: string,
              name: string,
              description: longText,
              days: array,
              start_time: timestamp,
              end_time: timestamp,
              start_date: datetime,
              end_date: datetime,
              system: string,
              location: string,
              soundcloud_url: string,
              youtube_url: string,
              google_url: string,
              book: name,
              cost: float,
              payment_url: string,
              sciences: array,
              duration: integer // duration in minutes
            }]
        }

# Get Sciences

    GET /api/sciences
    Params: {}
    Response: <Array>object
      [{
        uid: string,
        name: string,
        parent_id: string // uid: unique identifier of its parent
      }]

# GET FAQ

    GET /api/faq
    params: {}
    Response: <Array>object
      [{
        uid: string,
        question: string,
        answer: longText
      }]
