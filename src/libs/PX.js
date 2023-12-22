// @ts-nocheck

const reverseEv = (e, t, n) => {
  for (
    var r = reverseIe(decode(n), 10), o = [], a = -1, i = 0;
    i < e.length;
    i++
  ) {
    var c = Math.floor(i / r.length + 1),
      l = i >= r.length ? i % r.length : i,
      u = r.charCodeAt(l) * r.charCodeAt(c);
    u > a && (a = u);
  }
  for (var h = 0; e.length > h; h++) {
    var l = Math.floor(h / r.length) + 1,
      s = h % r.length,
      Z = r.charCodeAt(s) * r.charCodeAt(l);

    for (Z >= t && (Z = WV(Z, 0, a, 0, t - 1)); -1 !== o.indexOf(Z); ) Z += 1;
    o.push(Z);
  }
  return o.sort(function (e, t) {
    return e - t;
  });
};

const decode = (t) => {
  return Buffer.from(t).toString("base64");
};

const reverseIe = (t, e) => {
  for (var n = "", i = 0; i < t.length; i++)
    n += String.fromCharCode(t.charCodeAt(i) ^ e);
  return n;
};

const WV = function (t, e, n, r, o) {
  return Math.floor(((t - e) / (n - e)) * (o - r) + r);
};

const reverseFa = (t, r, n) => {
  let splitPayload = [];
  for (let o = 0, i = 0; i < t.length; i++) {
    var current = n[i] - i - o;
    splitPayload.splice(o, 0, ...r.slice(0, current));
    r = r.slice(current);
    o = n[i] - i - 1;
  }
  var base6Payload = Buffer.from(
    splitPayload.join("").slice(0, -t.length) + r,
    "base64"
  ).toString("ascii");

  for (var r = "", i = 0; i < base6Payload.length; i++)
    r += String.fromCharCode(base6Payload.charCodeAt(i) ^ 50);
  return r;
};

const orderPayloadKeys = (decodedPayload) => {
  for (let i = 0; i < Object.keys(decodedPayload).length; i++) {
    const orderedKey = Object.keys(decodedPayload[i]["d"])
      .sort()
      .reduce((obj, key) => {
        obj[key] = decodedPayload[i]["d"][key];
        return obj;
      }, {});
    decodedPayload[i]["d"] = orderedKey;
  }
};

export default {
  decode: (encodedPayload, uuid, sts) => {
    var newsts = sts.length === 0 ? "1604064986000" : sts;
    const reverseFv = reverseIe(decode(newsts), 10);

    return reverseFa(
      reverseFv,
      encodedPayload,
      reverseEv(reverseFv, encodedPayload.length - 20, uuid)
    );
  },
  orderPayloadKeys: orderPayloadKeys,
};
