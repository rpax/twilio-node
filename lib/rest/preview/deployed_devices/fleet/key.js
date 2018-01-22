'use strict';

/* jshint ignore:start */
/**
 * This code was generated by
 * \ / _    _  _|   _  _
 *  | (_)\/(_)(_|\/| |(/_  v1.0.0
 *       /       /
 */
/* jshint ignore:end */

var Q = require('q');  /* jshint ignore:line */
var _ = require('lodash');  /* jshint ignore:line */
var Page = require('../../../../base/Page');  /* jshint ignore:line */
var deserialize = require(
    '../../../../base/deserialize');  /* jshint ignore:line */
var values = require('../../../../base/values');  /* jshint ignore:line */

var KeyList;
var KeyPage;
var KeyInstance;
var KeyContext;

/* jshint ignore:start */
/**
 * @constructor Twilio.Preview.DeployedDevices.FleetContext.KeyList
 * @description Initialize the KeyList
 * PLEASE NOTE that this class contains preview products that are subject to change. Use them with caution. If you currently do not have developer preview access, please contact help@twilio.com.
 *
 * @param {Twilio.Preview.DeployedDevices} version - Version of the resource
 * @param {string} fleetSid - The unique identifier of the Fleet.
 */
/* jshint ignore:end */
KeyList = function KeyList(version, fleetSid) {
  /* jshint ignore:start */
  /**
   * @function keys
   * @memberof Twilio.Preview.DeployedDevices.FleetContext
   * @instance
   *
   * @param {string} sid - sid of instance
   *
   * @returns {Twilio.Preview.DeployedDevices.FleetContext.KeyContext}
   */
  /* jshint ignore:end */
  function KeyListInstance(sid) {
    return KeyListInstance.get(sid);
  }

  KeyListInstance._version = version;
  // Path Solution
  KeyListInstance._solution = {fleetSid: fleetSid};
  KeyListInstance._uri = _.template(
    '/Fleets/<%= fleetSid %>/Keys' // jshint ignore:line
  )(KeyListInstance._solution);
  /* jshint ignore:start */
  /**
   * create a KeyInstance
   *
   * @function create
   * @memberof Twilio.Preview.DeployedDevices.FleetContext.KeyList
   * @instance
   *
   * @param {object|function} opts - ...
   * @param {string} [opts.friendlyName] -
   *          The human readable description for this Key.
   * @param {string} [opts.deviceSid] -
   *          The unique identifier of a Key to be authenticated.
   * @param {function} [callback] - Callback to handle processed record
   *
   * @returns {Promise} Resolves to processed KeyInstance
   */
  /* jshint ignore:end */
  KeyListInstance.create = function create(opts, callback) {
    if (_.isFunction(opts)) {
      callback = opts;
      opts = {};
    }
    opts = opts || {};

    var deferred = Q.defer();
    var data = values.of({
      'FriendlyName': _.get(opts, 'friendlyName'),
      'DeviceSid': _.get(opts, 'deviceSid')
    });

    var promise = this._version.create({uri: this._uri, method: 'POST', data: data});

    promise = promise.then(function(payload) {
      deferred.resolve(new KeyInstance(this._version, payload, this._solution.fleetSid, this._solution.sid));
    }.bind(this));

    promise.catch(function(error) {
      deferred.reject(error);
    });

    if (_.isFunction(callback)) {
      deferred.promise.nodeify(callback);
    }

    return deferred.promise;
  };

  /* jshint ignore:start */
  /**
   * Streams KeyInstance records from the API.
   *
   * This operation lazily loads records as efficiently as possible until the limit
   * is reached.
   *
   * The results are passed into the callback function, so this operation is memory efficient.
   *
   * If a function is passed as the first argument, it will be used as the callback function.
   *
   * @function each
   * @memberof Twilio.Preview.DeployedDevices.FleetContext.KeyList
   * @instance
   *
   * @param {object|function} opts - ...
   * @param {string} [opts.deviceSid] -
   *          Find all Keys authenticating specified Device.
   * @param {number} [opts.limit] -
   *         Upper limit for the number of records to return.
   *         each() guarantees never to return more than limit.
   *         Default is no limit
   * @param {number} [opts.pageSize=50] -
   *         Number of records to fetch per request,
   *         when not set will use the default value of 50 records.
   *         If no pageSize is defined but a limit is defined,
   *         each() will attempt to read the limit with the most efficient
   *         page size, i.e. min(limit, 1000)
   * @param {Function} [opts.callback] -
   *         Function to process each record. If this and a positional
   * callback are passed, this one will be used
   * @param {Function} [opts.done] -
   *          Function to be called upon completion of streaming
   * @param {Function} [callback] - Function to process each record
   */
  /* jshint ignore:end */
  KeyListInstance.each = function each(opts, callback) {
    opts = opts || {};
    if (_.isFunction(opts)) {
      opts = { callback: opts };
    } else if (_.isFunction(callback) && !_.isFunction(opts.callback)) {
      opts.callback = callback;
    }

    if (_.isUndefined(opts.callback)) {
      throw new Error('Callback function must be provided');
    }

    var done = false;
    var currentPage = 1;
    var currentResource = 0;
    var limits = this._version.readLimits({
      limit: opts.limit,
      pageSize: opts.pageSize
    });

    function onComplete(error) {
      done = true;
      if (_.isFunction(opts.done)) {
        opts.done(error);
      }
    }

    function fetchNextPage(fn) {
      var promise = fn();
      if (_.isUndefined(promise)) {
        onComplete();
        return;
      }

      promise.then(function(page) {
        _.each(page.instances, function(instance) {
          if (done || (!_.isUndefined(opts.limit) && currentResource >= opts.limit)) {
            done = true;
            return false;
          }

          currentResource++;
          opts.callback(instance, onComplete);
        });

        if ((limits.pageLimit && limits.pageLimit <= currentPage)) {
          onComplete();
        } else if (!done) {
          currentPage++;
          fetchNextPage(_.bind(page.nextPage, page));
        }
      });

      promise.catch(onComplete);
    }

    fetchNextPage(_.bind(this.page, this, _.merge(opts, limits)));
  };

  /* jshint ignore:start */
  /**
   * @description Lists KeyInstance records from the API as a list.
   *
   * If a function is passed as the first argument, it will be used as the callback function.
   *
   * @function list
   * @memberof Twilio.Preview.DeployedDevices.FleetContext.KeyList
   * @instance
   *
   * @param {object|function} opts - ...
   * @param {string} [opts.deviceSid] -
   *          Find all Keys authenticating specified Device.
   * @param {number} [opts.limit] -
   *         Upper limit for the number of records to return.
   *         list() guarantees never to return more than limit.
   *         Default is no limit
   * @param {number} [opts.pageSize] -
   *         Number of records to fetch per request,
   *         when not set will use the default value of 50 records.
   *         If no page_size is defined but a limit is defined,
   *         list() will attempt to read the limit with the most
   *         efficient page size, i.e. min(limit, 1000)
   * @param {function} [callback] - Callback to handle list of records
   *
   * @returns {Promise} Resolves to a list of records
   */
  /* jshint ignore:end */
  KeyListInstance.list = function list(opts, callback) {
    if (_.isFunction(opts)) {
      callback = opts;
      opts = {};
    }
    opts = opts || {};
    var deferred = Q.defer();
    var allResources = [];
    opts.callback = function(resource, done) {
      allResources.push(resource);

      if (!_.isUndefined(opts.limit) && allResources.length === opts.limit) {
        done();
      }
    };

    opts.done = function(error) {
      if (_.isUndefined(error)) {
        deferred.resolve(allResources);
      } else {
        deferred.reject(error);
      }
    };

    if (_.isFunction(callback)) {
      deferred.promise.nodeify(callback);
    }

    this.each(opts);
    return deferred.promise;
  };

  /* jshint ignore:start */
  /**
   * Retrieve a single page of KeyInstance records from the API.
   * Request is executed immediately
   *
   * If a function is passed as the first argument, it will be used as the callback function.
   *
   * @function page
   * @memberof Twilio.Preview.DeployedDevices.FleetContext.KeyList
   * @instance
   *
   * @param {object|function} opts - ...
   * @param {string} [opts.deviceSid] -
   *          Find all Keys authenticating specified Device.
   * @param {string} [opts.pageToken] - PageToken provided by the API
   * @param {number} [opts.pageNumber] -
   *          Page Number, this value is simply for client state
   * @param {number} [opts.pageSize] - Number of records to return, defaults to 50
   * @param {function} [callback] - Callback to handle list of records
   *
   * @returns {Promise} Resolves to a list of records
   */
  /* jshint ignore:end */
  KeyListInstance.page = function page(opts, callback) {
    if (_.isFunction(opts)) {
      callback = opts;
      opts = {};
    }
    opts = opts || {};

    var deferred = Q.defer();
    var data = values.of({
      'DeviceSid': _.get(opts, 'deviceSid'),
      'PageToken': opts.pageToken,
      'Page': opts.pageNumber,
      'PageSize': opts.pageSize
    });

    var promise = this._version.page({uri: this._uri, method: 'GET', params: data});

    promise = promise.then(function(payload) {
      deferred.resolve(new KeyPage(this._version, payload, this._solution));
    }.bind(this));

    promise.catch(function(error) {
      deferred.reject(error);
    });

    if (_.isFunction(callback)) {
      deferred.promise.nodeify(callback);
    }

    return deferred.promise;
  };

  /* jshint ignore:start */
  /**
   * Retrieve a single target page of KeyInstance records from the API.
   * Request is executed immediately
   *
   * If a function is passed as the first argument, it will be used as the callback function.
   *
   * @function getPage
   * @memberof Twilio.Preview.DeployedDevices.FleetContext.KeyList
   * @instance
   *
   * @param {string} [opts.deviceSid] -
   *          Find all Keys authenticating specified Device.
   * @param {string} [targetUrl] - API-generated URL for the requested results page
   * @param {function} [callback] - Callback to handle list of records
   *
   * @returns {Promise} Resolves to a list of records
   */
  /* jshint ignore:end */
  KeyListInstance.getPage = function getPage(targetUrl, callback) {
    var deferred = Q.defer();

    var promise = this._version._domain.twilio.request({method: 'GET', uri: targetUrl});

    promise = promise.then(function(payload) {
      deferred.resolve(new KeyPage(this._version, payload, this._solution));
    }.bind(this));

    promise.catch(function(error) {
      deferred.reject(error);
    });

    if (_.isFunction(callback)) {
      deferred.promise.nodeify(callback);
    }

    return deferred.promise;
  };

  /* jshint ignore:start */
  /**
   * Constructs a key
   *
   * @function get
   * @memberof Twilio.Preview.DeployedDevices.FleetContext.KeyList
   * @instance
   *
   * @param {string} sid - A string that uniquely identifies the Key.
   *
   * @returns {Twilio.Preview.DeployedDevices.FleetContext.KeyContext}
   */
  /* jshint ignore:end */
  KeyListInstance.get = function get(sid) {
    return new KeyContext(this._version, this._solution.fleetSid, sid);
  };

  return KeyListInstance;
};


/* jshint ignore:start */
/**
 * @constructor Twilio.Preview.DeployedDevices.FleetContext.KeyPage
 * @augments Page
 * @description Initialize the KeyPage
 * PLEASE NOTE that this class contains preview products that are subject to change. Use them with caution. If you currently do not have developer preview access, please contact help@twilio.com.
 *
 * @param {Twilio.Preview.DeployedDevices} version - Version of the resource
 * @param {object} response - Response from the API
 * @param {object} solution - Path solution
 *
 * @returns KeyPage
 */
/* jshint ignore:end */
KeyPage = function KeyPage(version, response, solution) {
  // Path Solution
  this._solution = solution;

  Page.prototype.constructor.call(this, version, response, this._solution);
};

_.extend(KeyPage.prototype, Page.prototype);
KeyPage.prototype.constructor = KeyPage;

/* jshint ignore:start */
/**
 * Build an instance of KeyInstance
 *
 * @function getInstance
 * @memberof Twilio.Preview.DeployedDevices.FleetContext.KeyPage
 * @instance
 *
 * @param {object} payload - Payload response from the API
 *
 * @returns KeyInstance
 */
/* jshint ignore:end */
KeyPage.prototype.getInstance = function getInstance(payload) {
  return new KeyInstance(this._version, payload, this._solution.fleetSid);
};


/* jshint ignore:start */
/**
 * @constructor Twilio.Preview.DeployedDevices.FleetContext.KeyInstance
 * @description Initialize the KeyContext
 * PLEASE NOTE that this class contains preview products that are subject to change. Use them with caution. If you currently do not have developer preview access, please contact help@twilio.com.
 *
 * @property {string} sid - A string that uniquely identifies this Key.
 * @property {string} url - URL of this Key.
 * @property {string} friendlyName - A human readable description for this Key.
 * @property {string} fleetSid - The unique identifier of the Fleet.
 * @property {string} accountSid - The unique SID that identifies this Account.
 * @property {string} deviceSid - The unique identifier of a mapped Device.
 * @property {string} secret - The key secret.
 * @property {Date} dateCreated - The date this Key credential was created.
 * @property {Date} dateUpdated - The date this Key credential was updated.
 *
 * @param {Twilio.Preview.DeployedDevices} version - Version of the resource
 * @param {object} payload - The instance payload
 * @param {sid_like} fleetSid - The fleet_sid
 * @param {sid} sid - A string that uniquely identifies the Key.
 */
/* jshint ignore:end */
KeyInstance = function KeyInstance(version, payload, fleetSid, sid) {
  this._version = version;

  // Marshaled Properties
  this.sid = payload.sid; // jshint ignore:line
  this.url = payload.url; // jshint ignore:line
  this.friendlyName = payload.friendly_name; // jshint ignore:line
  this.fleetSid = payload.fleet_sid; // jshint ignore:line
  this.accountSid = payload.account_sid; // jshint ignore:line
  this.deviceSid = payload.device_sid; // jshint ignore:line
  this.secret = payload.secret; // jshint ignore:line
  this.dateCreated = deserialize.iso8601DateTime(payload.date_created); // jshint ignore:line
  this.dateUpdated = deserialize.iso8601DateTime(payload.date_updated); // jshint ignore:line

  // Context
  this._context = undefined;
  this._solution = {fleetSid: fleetSid, sid: sid || this.sid};
};

Object.defineProperty(KeyInstance.prototype,
  '_proxy', {
  get: function() {
    if (!this._context) {
      this._context = new KeyContext(this._version, this._solution.fleetSid, this._solution.sid);
    }

    return this._context;
  }
});

/* jshint ignore:start */
/**
 * fetch a KeyInstance
 *
 * @function fetch
 * @memberof Twilio.Preview.DeployedDevices.FleetContext.KeyInstance
 * @instance
 *
 * @param {function} [callback] - Callback to handle processed record
 *
 * @returns {Promise} Resolves to processed KeyInstance
 */
/* jshint ignore:end */
KeyInstance.prototype.fetch = function fetch(callback) {
  return this._proxy.fetch(callback);
};

/* jshint ignore:start */
/**
 * remove a KeyInstance
 *
 * @function remove
 * @memberof Twilio.Preview.DeployedDevices.FleetContext.KeyInstance
 * @instance
 *
 * @param {function} [callback] - Callback to handle processed record
 *
 * @returns {Promise} Resolves to processed KeyInstance
 */
/* jshint ignore:end */
KeyInstance.prototype.remove = function remove(callback) {
  return this._proxy.remove(callback);
};

/* jshint ignore:start */
/**
 * update a KeyInstance
 *
 * @function update
 * @memberof Twilio.Preview.DeployedDevices.FleetContext.KeyInstance
 * @instance
 *
 * @param {object|function} opts - ...
 * @param {string} [opts.friendlyName] -
 *          The human readable description for this Key.
 * @param {string} [opts.deviceSid] -
 *          The unique identifier of a Key to be authenticated.
 * @param {function} [callback] - Callback to handle processed record
 *
 * @returns {Promise} Resolves to processed KeyInstance
 */
/* jshint ignore:end */
KeyInstance.prototype.update = function update(opts, callback) {
  return this._proxy.update(opts, callback);
};


/* jshint ignore:start */
/**
 * @constructor Twilio.Preview.DeployedDevices.FleetContext.KeyContext
 * @description Initialize the KeyContext
 * PLEASE NOTE that this class contains preview products that are subject to change. Use them with caution. If you currently do not have developer preview access, please contact help@twilio.com.
 *
 * @param {Twilio.Preview.DeployedDevices} version - Version of the resource
 * @param {sid_like} fleetSid - The fleet_sid
 * @param {sid} sid - A string that uniquely identifies the Key.
 */
/* jshint ignore:end */
KeyContext = function KeyContext(version, fleetSid, sid) {
  this._version = version;

  // Path Solution
  this._solution = {fleetSid: fleetSid, sid: sid};
  this._uri = _.template(
    '/Fleets/<%= fleetSid %>/Keys/<%= sid %>' // jshint ignore:line
  )(this._solution);
};

/* jshint ignore:start */
/**
 * fetch a KeyInstance
 *
 * @function fetch
 * @memberof Twilio.Preview.DeployedDevices.FleetContext.KeyContext
 * @instance
 *
 * @param {function} [callback] - Callback to handle processed record
 *
 * @returns {Promise} Resolves to processed KeyInstance
 */
/* jshint ignore:end */
KeyContext.prototype.fetch = function fetch(callback) {
  var deferred = Q.defer();
  var promise = this._version.fetch({uri: this._uri, method: 'GET'});

  promise = promise.then(function(payload) {
    deferred.resolve(new KeyInstance(this._version, payload, this._solution.fleetSid, this._solution.sid));
  }.bind(this));

  promise.catch(function(error) {
    deferred.reject(error);
  });

  if (_.isFunction(callback)) {
    deferred.promise.nodeify(callback);
  }

  return deferred.promise;
};

/* jshint ignore:start */
/**
 * remove a KeyInstance
 *
 * @function remove
 * @memberof Twilio.Preview.DeployedDevices.FleetContext.KeyContext
 * @instance
 *
 * @param {function} [callback] - Callback to handle processed record
 *
 * @returns {Promise} Resolves to processed KeyInstance
 */
/* jshint ignore:end */
KeyContext.prototype.remove = function remove(callback) {
  var deferred = Q.defer();
  var promise = this._version.remove({uri: this._uri, method: 'DELETE'});

  promise = promise.then(function(payload) {
    deferred.resolve(payload);
  }.bind(this));

  promise.catch(function(error) {
    deferred.reject(error);
  });

  if (_.isFunction(callback)) {
    deferred.promise.nodeify(callback);
  }

  return deferred.promise;
};

/* jshint ignore:start */
/**
 * update a KeyInstance
 *
 * @function update
 * @memberof Twilio.Preview.DeployedDevices.FleetContext.KeyContext
 * @instance
 *
 * @param {object|function} opts - ...
 * @param {string} [opts.friendlyName] -
 *          The human readable description for this Key.
 * @param {string} [opts.deviceSid] -
 *          The unique identifier of a Key to be authenticated.
 * @param {function} [callback] - Callback to handle processed record
 *
 * @returns {Promise} Resolves to processed KeyInstance
 */
/* jshint ignore:end */
KeyContext.prototype.update = function update(opts, callback) {
  if (_.isFunction(opts)) {
    callback = opts;
    opts = {};
  }
  opts = opts || {};

  var deferred = Q.defer();
  var data = values.of({
    'FriendlyName': _.get(opts, 'friendlyName'),
    'DeviceSid': _.get(opts, 'deviceSid')
  });

  var promise = this._version.update({uri: this._uri, method: 'POST', data: data});

  promise = promise.then(function(payload) {
    deferred.resolve(new KeyInstance(this._version, payload, this._solution.fleetSid, this._solution.sid));
  }.bind(this));

  promise.catch(function(error) {
    deferred.reject(error);
  });

  if (_.isFunction(callback)) {
    deferred.promise.nodeify(callback);
  }

  return deferred.promise;
};

module.exports = {
  KeyList: KeyList,
  KeyPage: KeyPage,
  KeyInstance: KeyInstance,
  KeyContext: KeyContext
};