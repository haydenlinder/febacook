import React from 'react';

const LoggedOutGreeting = () => (
    <div className="greeting">

        <ul className="connect">

            <div className="title">
                Connect with friends and the <br />
                world around you on Febacook.
            </div>

            <li>
                <div className="sprite-container">
                    <div className="sprite one">sprite</div>
                </div>
                <b className="bold-greeting">See photos and updates</b> from friends in News Feed.
            </li>

            <li>
                <div className="sprite-container">
                    <div className="sprite two">sprite</div>
                </div>
                <b className="bold-greeting">Share what's new</b> in your life on your Timeline.
            </li>

            <li>
                <div className="sprite-container">
                    <div className="sprite three">sprite</div>
                </div>
                <b className="bold-greeting">Make connections</b> around the world.
            </li>

        </ul>

    </div>
)

export default LoggedOutGreeting;
