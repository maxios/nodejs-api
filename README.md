public apis for sheikh alamoud official website

Setup:

      npm i
      npm i -g sequelize-cli
      npm run setup-database
      node console.js
      > generate_science_parent_uid()  // this command for re arrange scinces dependencies to use unique identifiers

ORM console:

      cd <PROJECT_ROOT_PATH>
      node console.js

ORM console usage:

  fetch all data:

      MODEL_NAME.findAll({raw: true}).then(console.log).catch(console.log)

  create record:

      MODEL_NAME.create({<attributes written here>}).then(console.log).catch(console.log)


Deployment:

    ssh <VPC ADDRESS>
    cd <PROJECT PATH>
    git pull origin HEAD
    source .env
    pm2 restart core

note: .env file contains secret environment variables. update it manually, then source it using "source .env"

API Doc:

# GET Sessions

```
URI: GET /apis/sessions
// mainly these Query attributes for filteration purpose
Query: {
        days: Array (optional)
        location_ids: Array<String> (optional)
        system_ids: Array<String> (optional)
        science_ids: Array<String> (optional)
        instructor_ids: Array<String> (optional)
        tag_ids: Array<String> (optional)
        tag_names: Array<String> (optional)
        rowaq_id: Integer enum[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] (optional)
        after_date: String (optional), format: yyyy-mm-dd
        before_date: String (optional), format: yyyy-mm-dd
}
Response: Array<Object>
[{
       uid: string,
       name: string,
       description: longText,
       days: array,
       start_time: timestamp,
       end_time: timestamp,
       start_date: datetime,
       end_date: datetime,
       soundcloud_url: string,
       youtube_url: string,
       google_url: string,
       book: name,
       cost: float,
       rowaq_id: integer,
       payment_url: string,
       duration: integer // duration in minutes
       system: Object,
       location: Object,
       sciences: Array<Object>
       instructors: Array<Object>
       tags: Array<Object>
}]
```

# GET Specific Sessions

```
URI: GET /apis/sessions/:uid
// mainly these Query attributes for filteration purpose
Query: {}
Response: Object
{
       uid: string,
       name: string,
       description: longText,
       days: array,
       start_time: timestamp,
       end_time: timestamp,
       start_date: datetime,
       end_date: datetime,
       soundcloud_url: string,
       youtube_url: string,
       google_url: string,
       book: name,
       cost: float,
       rowaq_id: integer,
       payment_url: string,
       duration: integer // duration in minutes
       system: Object,
       location: Object,
       sciences: Array<Object>
       instructors: Array<Object>
       tags: Array<Object>
}
```

# Get Systems

```
URI: GET /apis/systems
Query: {}
Response: Array
[{
       uid: string,
       name: string,
       description: longText
}]
```

# GET Instructors

```
URI: GET /apis/instructors
Query: {}
Response: Array
[{
       uid: string, // unique id
       name: string, // name of the instructor
       avatar: string, // personal image link of the instructor
       status: int, // 0 = previous instructor, 1 = current instructor
       order: int // first in order is the smallest number
}]
```
# GET specific instructor

```
URI: GET /apis/instructors/:uid
Query: {}
Response: object
{
       uid: string,
       name: string,
       avatar: string,
       sessions: <Array>
}
```

# Get Sciences

```
URI: GET /apis/sciences
Query: {}
Response: <Array>object
[{
       uid: string,
       name: string,
       parent_id: integer,
       parent_uid: string // uid: unique identifier of its parent
}]
```
# GET FAQ

```
URI: GET /apis/faq
Query: {}
Response: Array<Object>
[{
       uid: string,
       question: string,
       answer: longText
}]
```
## Exposed Endpoints for admin-forest for listing with the name space /forest
### GET all Location names {/apis/locations/forest}
### GET all Science names {/apis/sciences/forest}
### GET all instructor names {/apis/instructors/forest}
### GET all tag names {/apis/tags/forest}
