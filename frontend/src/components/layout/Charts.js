import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loading from './Loading';

import '../../../../node_modules/react-vis/dist/style.css';
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalBarSeries,
  RadialChart,
  DiscreteColorLegend,
} from 'react-vis';

const Charts = ({ trips: { trips, loading } }) => {
  // Time Date Vars
  const today = Date.now();
  const week = 604800000;
  const month = 2592000000;
  const year = 31556952000;
  let currentWeek = 0;
  let currentYear = 0;
  let previousWeek = 0;
  let previousYear = 0;
  let currentMonth = 0;
  let twoMonth = 0;
  let threeMonth = 0;
  let fourMonth = 0;

  trips.forEach((trip) => {
    if (
      Date.parse(trip.date_traveled) < today &&
      Date.parse(trip.date_traveled) > today - week
    ) {
      currentWeek += trip.distance_traveled;
    }
    if (
      Date.parse(trip.date_traveled) < today - week &&
      Date.parse(trip.date_traveled) > today - week * 2
    ) {
      previousWeek += trip.distance_traveled;
    }
    if (
      Date.parse(trip.date_traveled) < today &&
      Date.parse(trip.date_traveled) > today - month
    ) {
      currentMonth += trip.distance_traveled;
    }
    if (
      Date.parse(trip.date_traveled) < today - month &&
      Date.parse(trip.date_traveled) > today - month * 2
    ) {
      twoMonth += trip.distance_traveled;
    }
    if (
      Date.parse(trip.date_traveled) < today - month * 2 &&
      Date.parse(trip.date_traveled) > today - month * 3
    ) {
      threeMonth += trip.distance_traveled;
    }
    if (
      Date.parse(trip.date_traveled) < today - month * 3 &&
      Date.parse(trip.date_traveled) > today - month * 4
    ) {
      fourMonth += trip.distance_traveled;
    }
    if (
      Date.parse(trip.date_traveled) < today &&
      Date.parse(trip.date_traveled) > today - year
    ) {
      currentYear += trip.distance_traveled;
    }
    if (
      Date.parse(trip.date_traveled) < today - year &&
      Date.parse(trip.date_traveled) > today - year * 2
    ) {
      previousYear += trip.distance_traveled;
    }
  });

  // Weekly Data
  const weeklyData = [
    {
      angle: currentWeek,
      label: `${currentWeek.toFixed()} mi`,
      color: '#f04a4a',
      opacity: 0.7,
    },
    {
      angle: previousWeek,
      label: `${previousWeek.toFixed()} mi`,
      color: '#1E96BE',
    },
  ];

  // Monthly Data
  const monthlyData = [
    { x: '3 Month ', y: fourMonth },
    { x: '2 Month', y: threeMonth },
    { x: 'Last', y: twoMonth },
    { x: 'Current', y: currentMonth },
  ];

  // Yearly Data
  const currentYearData = [{ x: 'Current Year', y: currentYear }];
  const previousYearData = [{ x: 'Previous Year', y: previousYear }];

  return (
    <section className='bg-light p-4'>
      <h3 className='mb-2 text-primary'>
        <i className='fas fa-chart-pie text-secondary'></i> My Stats
      </h3>
      {trips.length > 0 ? (
        <div id='charts' className='row justify-content-center'>
          <div>
            <RadialChart
              data={weeklyData}
              padAngle={0.04}
              innerRadius={50}
              radius={90}
              width={300}
              height={200}
              className='shadow bg-white m-2 rounded-all'
              labelsRadiusMultiplier={0.8}
              labelsStyle={{ fontSize: 16, fontWeight: 700 }}
              showLabels
              colorType={'literal'}
              colorDomain={[0, 100]}
              colorRange={[0, 10]}
              style={{ stroke: '#fff', strokeWidth: 2 }}
            />
            <DiscreteColorLegend
              height={100}
              width={100}
              items={[
                { title: 'Current Week', color: '#f04a4a' },
                { title: 'Last Week', color: '#1E96BE' },
              ]}
              style={{ position: 'absolute', top: 5, overflow: 'hidden' }}
              className='ml-2'
            />
          </div>
          <XYPlot
            xType='ordinal'
            height={200}
            width={300}
            className='shadow bg-white rounded-all m-2'
          >
            <XAxis />
            <YAxis />
            <VerticalBarSeries
              data={monthlyData}
              color={'#f04a4a'}
              opacity={0.7}
            />
          </XYPlot>
          <XYPlot
            xType='ordinal'
            stackBy='y'
            height={200}
            width={300}
            className='shadow bg-white rounded-all m-2 px-auto p-2'
          >
            <XAxis />
            <YAxis />
            <VerticalBarSeries
              data={currentYearData}
              color={'#f04a4a'}
              opacity={0.7}
            />
            <VerticalBarSeries data={previousYearData} />
          </XYPlot>
        </div>
      ) : loading ? (
        <div className='text-center'>
          <Loading size={200} />
        </div>
      ) : (
        <p className='lead text-center text-danger'>
          Your stats will show here when you log trips.
        </p>
      )}
    </section>
  );
};

Charts.propTypes = {
  trips: PropTypes.object.isRequired,
};

const mapDispatchToProps = (state) => ({
  trips: state.tripsReducer,
});

export default connect(mapDispatchToProps)(Charts);
