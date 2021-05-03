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
var util = require('util');  /* jshint ignore:line */
var Page = require('../../../base/Page');  /* jshint ignore:line */
var deserialize = require(
    '../../../base/deserialize');  /* jshint ignore:line */
var serialize = require('../../../base/serialize');  /* jshint ignore:line */
var values = require('../../../base/values');  /* jshint ignore:line */

var EndUserList;
var EndUserPage;
var EndUserInstance;
var EndUserContext;

/* jshint ignore:start */
/**
 * Initialize the EndUserList
 *
 * @constructor Twilio.Trusthub.V1.EndUserList
 *
 * @param {Twilio.Trusthub.V1} version - Version of the resource
 */
/* jshint ignore:end */
EndUserList = function EndUserList(version) {
  /* jshint ignore:start */
  /**
   * @function endUsers
   * @memberof Twilio.Trusthub.V1#
   *
   * @param {string} sid - sid of instance
   *
   * @returns {Twilio.Trusthub.V1.EndUserContext}
   */
  /* jshint ignore:end */
  function EndUserListInstance(sid) {
    return EndUserListInstance.get(sid);
  }

  EndUserListInstance._version = version;
  // Path Solution
  EndUserListInstance._solution = {};
  EndUserListInstance._uri = `/EndUsers`;
  /* jshint ignore:start */
  /**
   * create a EndUserInstance
   *
   * @function create
   * @memberof Twilio.Trusthub.V1.EndUserList#
   *
   * @param {object} opts - Options for request
   * @param {string} opts.friendlyName -
   *          The string that you assigned to describe the resource
   * @param {string} opts.type - The type of end user of the Bundle resource
   * @param {object} [opts.attributes] -
   *          The set of parameters that compose the End User resource
   * @param {function} [callback] - Callback to handle processed record
   *
   * @returns {Promise} Resolves to processed EndUserInstance
   */
  /* jshint ignore:end */
  EndUserListInstance.create = function create(opts, callback) {
    if (_.isUndefined(opts)) {
      throw new Error('Required parameter "opts" missing.');
    }
    if (_.isUndefined(opts.friendlyName)) {
      throw new Error('Required parameter "opts.friendlyName" missing.');
    }
    if (_.isUndefined(opts.type)) {
      throw new Error('Required parameter "opts.type" missing.');
    }

    var deferred = Q.defer();
    var data = values.of({
      'FriendlyName': _.get(opts, 'friendlyName'),
      'Type': _.get(opts, 'type'),
      'Attributes': serialize.object(_.get(opts, 'attributes'))
    });

    var promise = this._version.create({uri: this._uri, method: 'POST', data: data});

    promise = promise.then(function(payload) {
      deferred.resolve(new EndUserInstance(this._version, payload, this._solution.sid));
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
   * Streams EndUserInstance records from the API.
   *
   * This operation lazily loads records as efficiently as possible until the limit
   * is reached.
   *
   * The results are passed into the callback function, so this operation is memory
   * efficient.
   *
   * If a function is passed as the first argument, it will be used as the callback
   * function.
   *
   * @function each
   * @memberof Twilio.Trusthub.V1.EndUserList#
   *
   * @param {object} [opts] - Options for request
   * @param {number} [opts.limit] -
   *         Upper limit for the number of records to return.
   *         each() guarantees never to return more than limit.
   *         Default is no limit
   * @param {number} [opts.pageSize] -
   *         Number of records to fetch per request,
   *         when not set will use the default value of 50 records.
   *         If no pageSize is defined but a limit is defined,
   *         each() will attempt to read the limit with the most efficient
   *         page size, i.e. min(limit, 1000)
   * @param {Function} [opts.callback] -
   *         Function to process each record. If this and a positional
   *         callback are passed, this one will be used
   * @param {Function} [opts.done] -
   *          Function to be called upon completion of streaming
   * @param {Function} [callback] - Function to process each record
   */
  /* jshint ignore:end */
  EndUserListInstance.each = function each(opts, callback) {
    if (_.isFunction(opts)) {
      callback = opts;
      opts = {};
    }
    opts = opts || {};
    if (opts.callback) {
      callback = opts.callback;
    }
    if (_.isUndefined(callback)) {
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
          callback(instance, onComplete);
        });

        if (!done) {
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
   * Lists EndUserInstance records from the API as a list.
   *
   * If a function is passed as the first argument, it will be used as the callback
   * function.
   *
   * @function list
   * @memberof Twilio.Trusthub.V1.EndUserList#
   *
   * @param {object} [opts] - Options for request
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
  EndUserListInstance.list = function list(opts, callback) {
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
   * Retrieve a single page of EndUserInstance records from the API.
   *
   * The request is executed immediately.
   *
   * If a function is passed as the first argument, it will be used as the callback
   * function.
   *
   * @function page
   * @memberof Twilio.Trusthub.V1.EndUserList#
   *
   * @param {object} [opts] - Options for request
   * @param {string} [opts.pageToken] - PageToken provided by the API
   * @param {number} [opts.pageNumber] -
   *          Page Number, this value is simply for client state
   * @param {number} [opts.pageSize] - Number of records to return, defaults to 50
   * @param {function} [callback] - Callback to handle list of records
   *
   * @returns {Promise} Resolves to a list of records
   */
  /* jshint ignore:end */
  EndUserListInstance.page = function page(opts, callback) {
    if (_.isFunction(opts)) {
      callback = opts;
      opts = {};
    }
    opts = opts || {};

    var deferred = Q.defer();
    var data = values.of({
      'PageToken': opts.pageToken,
      'Page': opts.pageNumber,
      'PageSize': opts.pageSize
    });

    var promise = this._version.page({uri: this._uri, method: 'GET', params: data});

    promise = promise.then(function(payload) {
      deferred.resolve(new EndUserPage(this._version, payload, this._solution));
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
   * Retrieve a single target page of EndUserInstance records from the API.
   *
   * The request is executed immediately.
   *
   * If a function is passed as the first argument, it will be used as the callback
   * function.
   *
   * @function getPage
   * @memberof Twilio.Trusthub.V1.EndUserList#
   *
   * @param {string} [targetUrl] - API-generated URL for the requested results page
   * @param {function} [callback] - Callback to handle list of records
   *
   * @returns {Promise} Resolves to a list of records
   */
  /* jshint ignore:end */
  EndUserListInstance.getPage = function getPage(targetUrl, callback) {
    var deferred = Q.defer();

    var promise = this._version._domain.twilio.request({method: 'GET', uri: targetUrl});

    promise = promise.then(function(payload) {
      deferred.resolve(new EndUserPage(this._version, payload, this._solution));
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
   * Constructs a end_user
   *
   * @function get
   * @memberof Twilio.Trusthub.V1.EndUserList#
   *
   * @param {string} sid - The unique string that identifies the resource
   *
   * @returns {Twilio.Trusthub.V1.EndUserContext}
   */
  /* jshint ignore:end */
  EndUserListInstance.get = function get(sid) {
    return new EndUserContext(this._version, sid);
  };

  /* jshint ignore:start */
  /**
   * Provide a user-friendly representation
   *
   * @function toJSON
   * @memberof Twilio.Trusthub.V1.EndUserList#
   *
   * @returns Object
   */
  /* jshint ignore:end */
  EndUserListInstance.toJSON = function toJSON() {
    return this._solution;
  };

  EndUserListInstance[util.inspect.custom] = function inspect(depth, options) {
    return util.inspect(this.toJSON(), options);
  };

  return EndUserListInstance;
};


/* jshint ignore:start */
/**
 * Initialize the EndUserPage
 *
 * @constructor Twilio.Trusthub.V1.EndUserPage
 *
 * @param {V1} version - Version of the resource
 * @param {Response<string>} response - Response from the API
 * @param {EndUserSolution} solution - Path solution
 *
 * @returns EndUserPage
 */
/* jshint ignore:end */
EndUserPage = function EndUserPage(version, response, solution) {
  // Path Solution
  this._solution = solution;

  Page.prototype.constructor.call(this, version, response, this._solution);
};

_.extend(EndUserPage.prototype, Page.prototype);
EndUserPage.prototype.constructor = EndUserPage;

/* jshint ignore:start */
/**
 * Build an instance of EndUserInstance
 *
 * @function getInstance
 * @memberof Twilio.Trusthub.V1.EndUserPage#
 *
 * @param {EndUserPayload} payload - Payload response from the API
 *
 * @returns EndUserInstance
 */
/* jshint ignore:end */
EndUserPage.prototype.getInstance = function getInstance(payload) {
  return new EndUserInstance(this._version, payload);
};

/* jshint ignore:start */
/**
 * Provide a user-friendly representation
 *
 * @function toJSON
 * @memberof Twilio.Trusthub.V1.EndUserPage#
 *
 * @returns Object
 */
/* jshint ignore:end */
EndUserPage.prototype.toJSON = function toJSON() {
  let clone = {};
  _.forOwn(this, function(value, key) {
    if (!_.startsWith(key, '_') && ! _.isFunction(value)) {
      clone[key] = value;
    }
  });
  return clone;
};

EndUserPage.prototype[util.inspect.custom] = function inspect(depth, options) {
  return util.inspect(this.toJSON(), options);
};


/* jshint ignore:start */
/**
 * Initialize the EndUserContext
 *
 * @constructor Twilio.Trusthub.V1.EndUserInstance
 *
 * @property {string} sid - The unique string that identifies the resource
 * @property {string} accountSid - The SID of the Account that created the resource
 * @property {string} friendlyName -
 *          The string that you assigned to describe the resource
 * @property {string} type - The type of end user of the Bundle resource
 * @property {object} attributes -
 *          The set of parameters that compose the End Users resource
 * @property {Date} dateCreated -
 *          The ISO 8601 date and time in GMT when the resource was created
 * @property {Date} dateUpdated -
 *          The ISO 8601 date and time in GMT when the resource was last updated
 * @property {string} url - The absolute URL of the End User resource
 *
 * @param {V1} version - Version of the resource
 * @param {EndUserPayload} payload - The instance payload
 * @param {sid} sid - The unique string that identifies the resource
 */
/* jshint ignore:end */
EndUserInstance = function EndUserInstance(version, payload, sid) {
  this._version = version;

  // Marshaled Properties
  this.sid = payload.sid; // jshint ignore:line
  this.accountSid = payload.account_sid; // jshint ignore:line
  this.friendlyName = payload.friendly_name; // jshint ignore:line
  this.type = payload.type; // jshint ignore:line
  this.attributes = payload.attributes; // jshint ignore:line
  this.dateCreated = deserialize.iso8601DateTime(payload.date_created); // jshint ignore:line
  this.dateUpdated = deserialize.iso8601DateTime(payload.date_updated); // jshint ignore:line
  this.url = payload.url; // jshint ignore:line

  // Context
  this._context = undefined;
  this._solution = {sid: sid || this.sid, };
};

Object.defineProperty(EndUserInstance.prototype,
  '_proxy', {
    get: function() {
      if (!this._context) {
        this._context = new EndUserContext(this._version, this._solution.sid);
      }

      return this._context;
    }
});

/* jshint ignore:start */
/**
 * fetch a EndUserInstance
 *
 * @function fetch
 * @memberof Twilio.Trusthub.V1.EndUserInstance#
 *
 * @param {function} [callback] - Callback to handle processed record
 *
 * @returns {Promise} Resolves to processed EndUserInstance
 */
/* jshint ignore:end */
EndUserInstance.prototype.fetch = function fetch(callback) {
  return this._proxy.fetch(callback);
};

/* jshint ignore:start */
/**
 * update a EndUserInstance
 *
 * @function update
 * @memberof Twilio.Trusthub.V1.EndUserInstance#
 *
 * @param {object} [opts] - Options for request
 * @param {string} [opts.friendlyName] -
 *          The string that you assigned to describe the resource
 * @param {object} [opts.attributes] -
 *          The set of parameters that compose the End User resource
 * @param {function} [callback] - Callback to handle processed record
 *
 * @returns {Promise} Resolves to processed EndUserInstance
 */
/* jshint ignore:end */
EndUserInstance.prototype.update = function update(opts, callback) {
  return this._proxy.update(opts, callback);
};

/* jshint ignore:start */
/**
 * remove a EndUserInstance
 *
 * @function remove
 * @memberof Twilio.Trusthub.V1.EndUserInstance#
 *
 * @param {function} [callback] - Callback to handle processed record
 *
 * @returns {Promise} Resolves to processed EndUserInstance
 */
/* jshint ignore:end */
EndUserInstance.prototype.remove = function remove(callback) {
  return this._proxy.remove(callback);
};

/* jshint ignore:start */
/**
 * Provide a user-friendly representation
 *
 * @function toJSON
 * @memberof Twilio.Trusthub.V1.EndUserInstance#
 *
 * @returns Object
 */
/* jshint ignore:end */
EndUserInstance.prototype.toJSON = function toJSON() {
  let clone = {};
  _.forOwn(this, function(value, key) {
    if (!_.startsWith(key, '_') && ! _.isFunction(value)) {
      clone[key] = value;
    }
  });
  return clone;
};

EndUserInstance.prototype[util.inspect.custom] = function inspect(depth,
    options) {
  return util.inspect(this.toJSON(), options);
};


/* jshint ignore:start */
/**
 * Initialize the EndUserContext
 *
 * @constructor Twilio.Trusthub.V1.EndUserContext
 *
 * @param {V1} version - Version of the resource
 * @param {sid} sid - The unique string that identifies the resource
 */
/* jshint ignore:end */
EndUserContext = function EndUserContext(version, sid) {
  this._version = version;

  // Path Solution
  this._solution = {sid: sid, };
  this._uri = `/EndUsers/${sid}`;
};

/* jshint ignore:start */
/**
 * fetch a EndUserInstance
 *
 * @function fetch
 * @memberof Twilio.Trusthub.V1.EndUserContext#
 *
 * @param {function} [callback] - Callback to handle processed record
 *
 * @returns {Promise} Resolves to processed EndUserInstance
 */
/* jshint ignore:end */
EndUserContext.prototype.fetch = function fetch(callback) {
  var deferred = Q.defer();
  var promise = this._version.fetch({uri: this._uri, method: 'GET'});

  promise = promise.then(function(payload) {
    deferred.resolve(new EndUserInstance(this._version, payload, this._solution.sid));
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
 * update a EndUserInstance
 *
 * @function update
 * @memberof Twilio.Trusthub.V1.EndUserContext#
 *
 * @param {object} [opts] - Options for request
 * @param {string} [opts.friendlyName] -
 *          The string that you assigned to describe the resource
 * @param {object} [opts.attributes] -
 *          The set of parameters that compose the End User resource
 * @param {function} [callback] - Callback to handle processed record
 *
 * @returns {Promise} Resolves to processed EndUserInstance
 */
/* jshint ignore:end */
EndUserContext.prototype.update = function update(opts, callback) {
  if (_.isFunction(opts)) {
    callback = opts;
    opts = {};
  }
  opts = opts || {};

  var deferred = Q.defer();
  var data = values.of({
    'FriendlyName': _.get(opts, 'friendlyName'),
    'Attributes': serialize.object(_.get(opts, 'attributes'))
  });

  var promise = this._version.update({uri: this._uri, method: 'POST', data: data});

  promise = promise.then(function(payload) {
    deferred.resolve(new EndUserInstance(this._version, payload, this._solution.sid));
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
 * remove a EndUserInstance
 *
 * @function remove
 * @memberof Twilio.Trusthub.V1.EndUserContext#
 *
 * @param {function} [callback] - Callback to handle processed record
 *
 * @returns {Promise} Resolves to processed EndUserInstance
 */
/* jshint ignore:end */
EndUserContext.prototype.remove = function remove(callback) {
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
 * Provide a user-friendly representation
 *
 * @function toJSON
 * @memberof Twilio.Trusthub.V1.EndUserContext#
 *
 * @returns Object
 */
/* jshint ignore:end */
EndUserContext.prototype.toJSON = function toJSON() {
  return this._solution;
};

EndUserContext.prototype[util.inspect.custom] = function inspect(depth, options)
    {
  return util.inspect(this.toJSON(), options);
};

module.exports = {
  EndUserList: EndUserList,
  EndUserPage: EndUserPage,
  EndUserInstance: EndUserInstance,
  EndUserContext: EndUserContext
};