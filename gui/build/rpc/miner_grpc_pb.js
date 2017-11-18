// GENERATED CODE -- DO NOT EDIT!

'use strict';

var grpc = require('grpc');
var messages_pb = require('./messages_pb.js');
var command_pb = require('./command_pb.js');

function serialize_cauchy_CommandRequest(arg) {
  if (!(arg instanceof command_pb.CommandRequest)) {
    throw new Error('Expected argument of type cauchy.CommandRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_cauchy_CommandRequest(buffer_arg) {
  return command_pb.CommandRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_cauchy_CommandStatusReply(arg) {
  if (!(arg instanceof command_pb.CommandStatusReply)) {
    throw new Error('Expected argument of type cauchy.CommandStatusReply');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_cauchy_CommandStatusReply(buffer_arg) {
  return command_pb.CommandStatusReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_cauchy_Event(arg) {
  if (!(arg instanceof messages_pb.Event)) {
    throw new Error('Expected argument of type cauchy.Event');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_cauchy_Event(buffer_arg) {
  return messages_pb.Event.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_cauchy_StatusRequest(arg) {
  if (!(arg instanceof messages_pb.StatusRequest)) {
    throw new Error('Expected argument of type cauchy.StatusRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_cauchy_StatusRequest(buffer_arg) {
  return messages_pb.StatusRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_cauchy_SystemStatusReply(arg) {
  if (!(arg instanceof command_pb.SystemStatusReply)) {
    throw new Error('Expected argument of type cauchy.SystemStatusReply');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_cauchy_SystemStatusReply(buffer_arg) {
  return command_pb.SystemStatusReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_cauchy_SystemStatusRequest(arg) {
  if (!(arg instanceof command_pb.SystemStatusRequest)) {
    throw new Error('Expected argument of type cauchy.SystemStatusRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_cauchy_SystemStatusRequest(buffer_arg) {
  return command_pb.SystemStatusRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

var MinerStatusService = exports.MinerStatusService = {
  reportStatus: {
    path: '/cauchy.MinerStatus/ReportStatus',
    requestStream: false,
    responseStream: false,
    requestType: messages_pb.StatusRequest,
    responseType: messages_pb.Event,
    requestSerialize: serialize_cauchy_StatusRequest,
    requestDeserialize: deserialize_cauchy_StatusRequest,
    responseSerialize: serialize_cauchy_Event,
    responseDeserialize: deserialize_cauchy_Event
  },
  startMiner: {
    path: '/cauchy.MinerStatus/StartMiner',
    requestStream: false,
    responseStream: false,
    requestType: command_pb.CommandRequest,
    responseType: command_pb.CommandStatusReply,
    requestSerialize: serialize_cauchy_CommandRequest,
    requestDeserialize: deserialize_cauchy_CommandRequest,
    responseSerialize: serialize_cauchy_CommandStatusReply,
    responseDeserialize: deserialize_cauchy_CommandStatusReply
  },
  stopMiner: {
    path: '/cauchy.MinerStatus/StopMiner',
    requestStream: false,
    responseStream: false,
    requestType: command_pb.CommandRequest,
    responseType: command_pb.CommandStatusReply,
    requestSerialize: serialize_cauchy_CommandRequest,
    requestDeserialize: deserialize_cauchy_CommandRequest,
    responseSerialize: serialize_cauchy_CommandStatusReply,
    responseDeserialize: deserialize_cauchy_CommandStatusReply
  },
  systemStatus: {
    path: '/cauchy.MinerStatus/SystemStatus',
    requestStream: false,
    responseStream: false,
    requestType: command_pb.SystemStatusRequest,
    responseType: command_pb.SystemStatusReply,
    requestSerialize: serialize_cauchy_SystemStatusRequest,
    requestDeserialize: deserialize_cauchy_SystemStatusRequest,
    responseSerialize: serialize_cauchy_SystemStatusReply,
    responseDeserialize: deserialize_cauchy_SystemStatusReply
  }
};

exports.MinerStatusClient = grpc.makeGenericClientConstructor(MinerStatusService);
//# sourceMappingURL=miner_grpc_pb.js.map