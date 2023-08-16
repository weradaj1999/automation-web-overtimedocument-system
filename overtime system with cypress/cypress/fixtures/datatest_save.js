// Example Test Data

const dataSuccessCase = 
[
      { 
            testCase: 'OT-SEND-T-001', 
            description : 'ส่งใบขอค่าล่วงเวลา ในวันทำงาน : โดยพนักงานระบุเวลาที่ขอ OT ไม่อยู่ในช่วงเวลาก่อนเวลาเข้างาน พักเที่ยง และหลังเข้างาน',
            inputDate: '03/01/2566', 
            inputStartHour: '19', 
            inputStartMins: '00', 
            inputEndHour: '21', 
            inputEndMins: '00', 
            inputTask: '01',
            expectedMessageSend:'ส่งเอกสารเรียบร้อยแล้ว',
            expectedDateInList:'03/01/2023',
            expectedTimeRequestInList:'19:00-21:00'},

      { 
            testCase: 'OT-SEND-T-002', 
            description : 'ส่งใบขอค่าล่วงเวลา ในวันทำงาน : โดยพนักงานระบุเวลาที่ขอ OT เป็นช่วงเวลาก่อนเข้างาน เท่านั้น',
            inputDate: '04/01/2566', 
            inputStartHour: '04', 
            inputStartMins: '00', 
            inputEndHour: '07', 
            inputEndMins: '00', 
            inputTask: '02',
            expectedMessageSend:'ส่งเอกสารเรียบร้อยแล้ว',
            expectedDateInList:'04/01/2023',
            expectedTimeRequestInList:'04:00-07:00'
      },

      { 
            testCase: 'OT-SEND-T-003', 
            description : 'ส่งใบขอค่าล่วงเวลา ในวันทำงาน : โดยพนักงานระบุเวลาที่ขอ OT เป็นช่วงเวลาพักเที่ยง เท่านั้น',
            inputDate: '03/01/2566', 
            inputStartHour: '12', 
            inputStartMins: '00', 
            inputEndHour: '13', 
            inputEndMins: '00', 
            inputTask: '03',
            expectedMessageSend:'ส่งเอกสารเรียบร้อยแล้ว',
            expectedDateInList:'03/01/2023',
            expectedTimeRequestInList:'12:00-13:00'
      },

      { 
            testCase: 'OT-SEND-T-004', 
            description : 'ส่งใบขอค่าล่วงเวลา ในวันทำงาน : โดยพนักงานระบุเวลาที่ขอ OT เป็นช่วงเวลาหลังเลิกงาน เท่านั้น',
            inputDate: '03/01/2566', 
            inputStartHour: '17', 
            inputStartMins: '00', 
            inputEndHour: '19', 
            inputEndMins: '00', 
            inputTask: '04',
            expectedMessageSend:'ส่งเอกสารเรียบร้อยแล้ว',
            expectedDateInList:'03/01/2023',
            expectedTimeRequestInList:'17:00-19:00'
      }
];       

const dataUnsuccessCase = 
[
      { 
            testCase: 'OT-SEND-F-001', 
            description : 'ส่งใบขอค่าล่วงเวลาอีกครั้ง โดยระบุข้อมูลวันที่ เวลาที่ขอ และงานที่ทำ ซ้ำกับเอกสารที่อยู่ในสถานะส่ง',
            inputDate: '31/01/2566', 
            inputStartHour: '17', 
            inputStartMins: '00', 
            inputEndHour: '19', 
            inputEndMins: '00', 
            inputTask: '01',
            expectedMessageSend:'มีรายการวันที่และเวลาคาบเกี่ยวแล้ว'
      },

      { 
            testCase: 'OT-SEND-F-002', 
            description : 'ส่งใบขอค่าล่วงเวลาอีกครั้ง โดยระบุข้อมูลวันที่ เวลาที่ขอ หน่วยงาน และงานที่ทำ ซ้ำกับเอกสารที่อยู่ในสถานะบันทึก',
            inputDate: '31/01/2566', 
            inputStartHour: '12', 
            inputStartMins: '00', 
            inputEndHour: '13', 
            inputEndMins: '00', 
            inputTask: '02',
            expectedMessageSend:'มีรายการวันที่และเวลาคาบเกี่ยวแล้ว'
      },

      { 
            testCase: 'OT-SEND-F-003', 
            description : 'ส่งใบขอค่าล่วงเวลาอีกครั้ง โดยระบุข้อมูลวันที่ เวลาที่ขอ หน่วยงาน และงานที่ทำ ซ้ำกับเอกสารที่อยู่ในสถานะอนุมัติ(จบ)',
            inputDate: '25/01/2566', 
            inputStartHour: '17', 
            inputStartMins: '00', 
            inputEndHour: '19', 
            inputEndMins: '00', 
            inputTask: '01',
            expectedMessageSend:'มีรายการวันที่และเวลาคาบเกี่ยวแล้ว'
      },

      { 
            testCase: 'OT-SEND-F-004', 
            description : 'ส่งใบขอค่าล่วงเวลาอีกครั้ง โดยระบุข้อมูลวันที่ เวลาที่ขอ หน่วยงาน และงานที่ทำ ซ้ำกับเอกสารที่อยู่ในสถานะคืนผู้สร้าง',
            inputDate: '20/01/2566', 
            inputStartHour: '04', 
            inputStartMins: '00', 
            inputEndHour: '06', 
            inputEndMins: '00', 
            inputTask: '01',
            expectedMessageSend:'มีรายการวันที่และเวลาคาบเกี่ยวแล้ว'},
];      

export {dataSuccessCase, dataUnsuccessCase};