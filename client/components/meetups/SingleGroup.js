// Imports
import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

// Component
const SingleGroup = ({name, meetups}) => {
  return (
    <div className="section">
      <div className="card">
        <div className="card-content grey-text text-darken-3">
          <span className="card-title text-style-bold">{name}</span>

          {!meetups.length ? (
            <div>No upcoming meetups were found.</div>
          ) : (
            <ul>
              {meetups.map(curMeetup => (
                <li key={curMeetup.id}>
                  <span className="text-style-bold text-color-red">
                    {`${curMeetup.name} `}
                  </span>

                  <div>
                    {curMeetup.venue &&
                    curMeetup.venue.address_1 &&
                    curMeetup.venue.city
                      ? `${curMeetup.venue.address_1}, ${curMeetup.venue.city}`
                      : 'TBD'}
                  </div>

                  <div>
                    <div
                      className="grey-text"
                      title={moment(curMeetup.time).format('LLLL')}
                    >
                      {`Takes place ${moment(curMeetup.time).fromNow()}`}
                    </div>

                    <a
                      className="meetup-time-and-rsvp-link"
                      href={curMeetup.event_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="right text-color-blue">
                        {`RSVP (${curMeetup.yes_rsvp_count}${
                          curMeetup.rsvp_limit ? '/' + curMeetup.rsvp_limit : ''
                        })`}
                      </span>
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

export default SingleGroup

// Prop Types
SingleGroup.propTypes = {
  name: PropTypes.string,
  meetups: PropTypes.array
}
