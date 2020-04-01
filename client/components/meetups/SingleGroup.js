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
              {meetups.map(curEvent => (
                <li key={curEvent.id}>
                  <span className="text-style-bold text-color-red">
                    {`${curEvent.name} `}
                  </span>

                  <div>
                    {curEvent.venue.address_1 && curEvent.venue.city
                      ? `${curEvent.venue.address_1}, ${curEvent.venue.city}`
                      : 'TBD'}
                  </div>

                  <div>
                    <div
                      className="grey-text"
                      title={moment(curEvent.time).format('LLLL')}
                    >
                      {moment(curEvent.time).fromNow()}
                    </div>

                    <a
                      className="events-time-and-rsvp-link"
                      href={curEvent.event_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="right text-color-blue">
                        {`RSVP (${curEvent.yes_rsvp_count}${
                          curEvent.rsvp_limit ? '/' + curEvent.rsvp_limit : ''
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
