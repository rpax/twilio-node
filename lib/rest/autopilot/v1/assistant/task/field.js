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
var Page = require('../../../../../base/Page');  /* jshint ignore:line */
var deserialize = require(
    '../../../../../base/deserialize');  /* jshint ignore:line */
var values = require('../../../../../base/values');  /* jshint ignore:line */

var FieldList;
var FieldPage;
var FieldInstance;
var FieldContext;

/* jshint ignore:start */
/**
 * @description Initialize the FieldList
 * PLEASE NOTE that this class contains preview products that are subject to change. Use them with caution. If you currently do not have developer preview access, please contact help@twilio.com.
 *
 * @param {Twilio.Autopilot.V1} version - Version of the resource
 * @param {string} assistantSid - The unique ID of the Assistant.
 * @param {string} taskSid - The unique ID of the Task associated with this Field.
 */
/* jshint ignore:end */
FieldList = function FieldList(version, assistantSid, taskSid) {
  /* jshint ignore:start */
  /**
   * @param {string} sid - sid of instance
   *
   * @returns {Twilio.Autopilot.V1.AssistantContext.TaskContext.FieldContext}
   */
  /* jshint ignore:end */
  function FieldListInstance(sid) {
    return FieldListInstance.get(sid);
  }

  FieldListInstance._version = version;
  // Path Solution
  FieldListInstance._solution = {assistantSid: assistantSid, taskSid: taskSid};
  FieldListInstance._uri = _.template(
    '/Assistants/<%= assistantSid %>/Tasks/<%= taskSid %>/Fields' // jshint ignore:line
  )(FieldListInstance._solution);
  /* jshint ignore:start */
  /**
   * Streams FieldInstance records from the API.
   *
   * This operation lazily loads records as efficiently as possible until the limit
   * is reached.
   *
   * The results are passed into the callback function, so this operation is memory efficient.
   *
   * If a function is passed as the first argument, it will be used as the callback function.
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
  FieldListInstance.each = function each(opts, callback) {
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
   * Lists FieldInstance records from the API as a list.
   *
   * If a function is passed as the first argument, it will be used as the callback function.
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
  FieldListInstance.list = function list(opts, callback) {
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
   * Retrieve a single page of FieldInstance records from the API.
   * Request is executed immediately
   *
   * If a function is passed as the first argument, it will be used as the callback function.
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
  FieldListInstance.page = function page(opts, callback) {
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
      deferred.resolve(new FieldPage(this._version, payload, this._solution));
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
   * Retrieve a single target page of FieldInstance records from the API.
   * Request is executed immediately
   *
   * If a function is passed as the first argument, it will be used as the callback function.
   *
   * @param {string} [targetUrl] - API-generated URL for the requested results page
   * @param {function} [callback] - Callback to handle list of records
   *
   * @returns {Promise} Resolves to a list of records
   */
  /* jshint ignore:end */
  FieldListInstance.getPage = function getPage(targetUrl, callback) {
    var deferred = Q.defer();

    var promise = this._version._domain.twilio.request({method: 'GET', uri: targetUrl});

    promise = promise.then(function(payload) {
      deferred.resolve(new FieldPage(this._version, payload, this._solution));
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
   * create a FieldInstance
   *
   * @param {object} opts - Options for request
   * @param {string} opts.fieldType -
   *          The Field Type of this field. It can be either a Built-in Field Type or the unique_name or sid of a custom Field Type.
   * @param {string} opts.uniqueName -
   *          A user-provided string that uniquely identifies this resource as an alternative to the sid. Unique up to 64 characters long.
   * @param {function} [callback] - Callback to handle processed record
   *
   * @returns {Promise} Resolves to processed FieldInstance
   */
  /* jshint ignore:end */
  FieldListInstance.create = function create(opts, callback) {
    if (_.isUndefined(opts)) {
      throw new Error('Required parameter "opts" missing.');
    }
    if (_.isUndefined(opts.fieldType)) {
      throw new Error('Required parameter "opts.fieldType" missing.');
    }
    if (_.isUndefined(opts.uniqueName)) {
      throw new Error('Required parameter "opts.uniqueName" missing.');
    }

    var deferred = Q.defer();
    var data = values.of({
      'FieldType': _.get(opts, 'fieldType'),
      'UniqueName': _.get(opts, 'uniqueName')
    });

    var promise = this._version.create({uri: this._uri, method: 'POST', data: data});

    promise = promise.then(function(payload) {
      deferred.resolve(new FieldInstance(
        this._version,
        payload,
        this._solution.assistantSid,
        this._solution.taskSid,
        this._solution.sid
      ));
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
   * Constructs a field
   *
   * @param {string} sid -
   *          A 34-character string that uniquely identifies this resource.
   *
   * @returns {Twilio.Autopilot.V1.AssistantContext.TaskContext.FieldContext}
   */
  /* jshint ignore:end */
  FieldListInstance.get = function get(sid) {
    return new FieldContext(this._version, this._solution.assistantSid, this._solution.taskSid, sid);
  };

  return FieldListInstance;
};


/* jshint ignore:start */
/**
 * Initialize the FieldPagePLEASE NOTE that this class contains preview products that are subject to change. Use them with caution. If you currently do not have developer preview access, please contact help@twilio.com.
 *
 * @param {V1} version - Version of the resource
 * @param {Response<string>} response - Response from the API
 * @param {FieldSolution} solution - Path solution
 *
 * @returns FieldPage
 */
/* jshint ignore:end */
FieldPage = function FieldPage(version, response, solution) {
  // Path Solution
  this._solution = solution;

  Page.prototype.constructor.call(this, version, response, this._solution);
};

_.extend(FieldPage.prototype, Page.prototype);
FieldPage.prototype.constructor = FieldPage;

/* jshint ignore:start */
/**
 * Build an instance of FieldInstance
 *
 * @param {FieldPayload} payload - Payload response from the API
 *
 * @returns FieldInstance
 */
/* jshint ignore:end */
FieldPage.prototype.getInstance = function getInstance(payload) {
  return new FieldInstance(
    this._version,
    payload,
    this._solution.assistantSid,
    this._solution.taskSid
  );
};


/* jshint ignore:start */
/**
 * Initialize the FieldContextPLEASE NOTE that this class contains preview products that are subject to change. Use them with caution. If you currently do not have developer preview access, please contact help@twilio.com.
 *
 * @property {string} accountSid -
 *          The unique ID of the Account that created this Field.
 * @property {Date} dateCreated - The date that this resource was created
 * @property {Date} dateUpdated - The date that this resource was last updated
 * @property {string} fieldType -
 *          The Field Type of this field. It can be either a Built-in Field Type or the unique_name or sid of a custom Field Type.
 * @property {string} taskSid -
 *          The unique ID of the Task associated with this Field.
 * @property {string} assistantSid - The unique ID of the Assistant.
 * @property {string} sid -
 *          A 34-character string that uniquely identifies this resource.
 * @property {string} uniqueName -
 *          A user-provided string that uniquely identifies this resource as an alternative to the sid. Unique up to 64 characters long.
 * @property {string} url - The url
 *
 * @param {V1} version - Version of the resource
 * @param {FieldPayload} payload - The instance payload
 * @param {sid} assistantSid - The unique ID of the Assistant.
 * @param {sid} taskSid - The unique ID of the Task associated with this Field.
 * @param {sid_like} sid -
 *          A 34-character string that uniquely identifies this resource.
 */
/* jshint ignore:end */
FieldInstance = function FieldInstance(version, payload, assistantSid, taskSid,
                                        sid) {
  this._version = version;

  // Marshaled Properties
  this.accountSid = payload.account_sid; // jshint ignore:line
  this.dateCreated = deserialize.iso8601DateTime(payload.date_created); // jshint ignore:line
  this.dateUpdated = deserialize.iso8601DateTime(payload.date_updated); // jshint ignore:line
  this.fieldType = payload.field_type; // jshint ignore:line
  this.taskSid = payload.task_sid; // jshint ignore:line
  this.assistantSid = payload.assistant_sid; // jshint ignore:line
  this.sid = payload.sid; // jshint ignore:line
  this.uniqueName = payload.unique_name; // jshint ignore:line
  this.url = payload.url; // jshint ignore:line

  // Context
  this._context = undefined;
  this._solution = {assistantSid: assistantSid, taskSid: taskSid, sid: sid || this.sid, };
};

Object.defineProperty(FieldInstance.prototype,
  '_proxy', {
  get: function() {
    if (!this._context) {
      this._context = new FieldContext(
        this._version,
        this._solution.assistantSid,
        this._solution.taskSid,
        this._solution.sid
      );
    }

    return this._context;
  }
});

/* jshint ignore:start */
/**
 * fetch a FieldInstance
 *
 * @param {function} [callback] - Callback to handle processed record
 *
 * @returns {Promise} Resolves to processed FieldInstance
 */
/* jshint ignore:end */
FieldInstance.prototype.fetch = function fetch(callback) {
  return this._proxy.fetch(callback);
};

/* jshint ignore:start */
/**
 * remove a FieldInstance
 *
 * @param {function} [callback] - Callback to handle processed record
 *
 * @returns {Promise} Resolves to processed FieldInstance
 */
/* jshint ignore:end */
FieldInstance.prototype.remove = function remove(callback) {
  return this._proxy.remove(callback);
};

/* jshint ignore:start */
/**
 * Produce a plain JSON object version of the FieldInstance for serialization.
 * Removes any circular references in the object.
 *
 * @returns Object
 */
/* jshint ignore:end */
FieldInstance.prototype.toJSON = function toJSON() {
  let clone = {};
  _.forOwn(this, function(value, key) {
    if (!_.startsWith(key, '_') && ! _.isFunction(value)) {
      clone[key] = value;
    }
  });
  return clone;
};


/* jshint ignore:start */
/**
 * Initialize the FieldContextPLEASE NOTE that this class contains preview products that are subject to change. Use them with caution. If you currently do not have developer preview access, please contact help@twilio.com.
 *
 * @param {V1} version - Version of the resource
 * @param {sid_like} assistantSid - The unique ID of the Assistant.
 * @param {sid_like} taskSid -
 *          The unique ID of the Task associated with this Field.
 * @param {sid_like} sid -
 *          A 34-character string that uniquely identifies this resource.
 */
/* jshint ignore:end */
FieldContext = function FieldContext(version, assistantSid, taskSid, sid) {
  this._version = version;

  // Path Solution
  this._solution = {assistantSid: assistantSid, taskSid: taskSid, sid: sid, };
  this._uri = _.template(
    '/Assistants/<%= assistantSid %>/Tasks/<%= taskSid %>/Fields/<%= sid %>' // jshint ignore:line
  )(this._solution);
};

/* jshint ignore:start */
/**
 * fetch a FieldInstance
 *
 * @param {function} [callback] - Callback to handle processed record
 *
 * @returns {Promise} Resolves to processed FieldInstance
 */
/* jshint ignore:end */
FieldContext.prototype.fetch = function fetch(callback) {
  var deferred = Q.defer();
  var promise = this._version.fetch({uri: this._uri, method: 'GET'});

  promise = promise.then(function(payload) {
    deferred.resolve(new FieldInstance(
      this._version,
      payload,
      this._solution.assistantSid,
      this._solution.taskSid,
      this._solution.sid
    ));
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
 * remove a FieldInstance
 *
 * @param {function} [callback] - Callback to handle processed record
 *
 * @returns {Promise} Resolves to processed FieldInstance
 */
/* jshint ignore:end */
FieldContext.prototype.remove = function remove(callback) {
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

module.exports = {
  FieldList: FieldList,
  FieldPage: FieldPage,
  FieldInstance: FieldInstance,
  FieldContext: FieldContext
};