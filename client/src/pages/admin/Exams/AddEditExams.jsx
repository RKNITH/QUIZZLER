import { Col, Form, message, Row, Select, Table } from "antd";
import React, { useEffect } from "react";
import {
    addExam,
    deleteQuestionById,
    editExamById,
    getExamById,
} from "../../../apicalls/exams.js";
import PageTitle from "../../../components/PageTitle.jsx";
import { useNavigate, useParams } from "react-router-dom";

import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../../redux/loderSlice.js";
import { Tabs } from "antd";
import AddEditQuestion from "./AddEditQuestions.jsx";
const { TabPane } = Tabs;

function AddEditExam() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [examData, setExamData] = React.useState(null);
    const [showAddEditQuestionModal, setShowAddEditQuestionModal] =
        React.useState(false);
    const [selectedQuestion, setSelectedQuestion] = React.useState(null);
    const params = useParams();
    const onFinish = async (values) => {
        try {
            dispatch(ShowLoading());
            let response;

            if (params.id) {
                response = await editExamById({
                    ...values,
                    examId: params.id,
                });
            } else {
                response = await addExam(values);
            }
            if (response.success) {
                message.success(response.message);
                navigate("/admin/exams");
            } else {
                message.error(response.message);
            }
            dispatch(HideLoading());
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        }
    };

    const getExamData = async () => {
        try {
            dispatch(ShowLoading());
            const response = await getExamById({
                examId: params.id,
            });
            dispatch(HideLoading());
            if (response.success) {
                setExamData(response.data);
            } else {
                message.error(response.message);
            }
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        }
    };

    useEffect(() => {
        if (params.id) {
            getExamData();
        }
    }, []);

    const deleteQuestion = async (questionId) => {
        try {
            dispatch(ShowLoading());
            const response = await deleteQuestionById({
                questionId,
                examId: params.id
            });
            dispatch(HideLoading());
            if (response.success) {
                message.success(response.message);
                getExamData();
            } else {
                message.error(response.message);
            }
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        }
    };

    const questionsColumns = [
        {
            title: "Question",
            dataIndex: "name",
        },
        {
            title: "Options",
            dataIndex: "options",
            render: (text, record) => {
                return Object.keys(record.options).map((key) => {
                    return (
                        <div>
                            {key} : {record.options[key]}
                        </div>
                    );
                });
            },
        },
        {
            title: "Correct Option",
            dataIndex: "correctOption",
            render: (text, record) => {
                return ` ${record.correctOption} : ${record.options[record.correctOption]
                    }`;
            },
        },
        {
            title: "Action",
            dataIndex: "action",
            render: (text, record) => (
                <div className="flex gap-2">
                    <i
                        className="ri-pencil-line"
                        onClick={() => {
                            setSelectedQuestion(record);
                            setShowAddEditQuestionModal(true);
                        }}
                    ></i>
                    <i
                        className="ri-delete-bin-line"
                        onClick={() => {
                            deleteQuestion(record._id);
                        }}
                    ></i>
                </div>
            ),
        },
    ];

    return (
        <div id="form">
            <PageTitle title={params.id ? "Edit Exam" : "Add Exam"} />
            <div className="divider"></div>

            {(examData || !params.id) && (
                <Form layout="vertical" onFinish={onFinish} initialValues={examData}>
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="Exam Details" key="1">
                            <Row gutter={[10, 10]}>
                                <Col span={8}>
                                    <Form.Item label="Exam Name" name="name">
                                        <input type="text" />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label="Exam Duration" name="duration">
                                        <input type="number" />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label="Category" name="category">
                                        <select name="" id="">
                                            <option value="">Select Category</option>
                                            <option value="math">Math</option>
                                            <option value="physics">Physics</option>
                                            <option value="chemistry">Chemistry</option>
                                            <option value="biology">Biology</option>
                                            <option value="history">History</option>
                                            <option value="geography">Geography</option>
                                            <option value="civics">Civics</option>
                                            <option value="english">English</option>
                                            <option value="hindi">Hindi</option>
                                            <option value="sanskrit">Sanskrit</option>
                                            <option value="advanced-math">Advanced Math</option>
                                            <option value="computer-science">Computer Science</option>
                                            <option value="economics">Economics</option>
                                            <option value="political-science">Political Science</option>
                                            <option value="psychology">Psychology</option>
                                            <option value="sociology">Sociology</option>
                                            <option value="philosophy">Philosophy</option>
                                            <option value="art">Art</option>
                                            <option value="music">Music</option>
                                            <option value="physical-education">Physical Education</option>
                                            <option value="business-studies">Business Studies</option>
                                            <option value="accounting">Accounting</option>
                                            <option value="computer-applications">Computer Applications</option>
                                            <option value="environmental-science">Environmental Science</option>
                                            <option value="history-of-science">History of Science</option>
                                            <option value="literature">Literature</option>
                                            <option value="drama">Drama</option>
                                            <option value="law">Law</option>
                                            <option value="engineering">Engineering</option>
                                            <option value="medicine">Medicine</option>
                                            <option value="nursing">Nursing</option>
                                            <option value="pharmacy">Pharmacy</option>
                                            <option value="astronomy">Astronomy</option>
                                            <option value="geology">Geology</option>
                                            <option value="botany">Botany</option>
                                            <option value="zoology">Zoology</option>
                                            <option value="meteorology">Meteorology</option>
                                            <option value="oceanography">Oceanography</option>
                                            <option value="agriculture">Agriculture</option>
                                            <option value="food-science">Food Science</option>
                                            <option value="nutrition">Nutrition</option>
                                            <option value="architecture">Architecture</option>
                                            <option value="urban-planning">Urban Planning</option>
                                            <option value="civil-engineering">Civil Engineering</option>
                                            <option value="mechanical-engineering">Mechanical Engineering</option>
                                            <option value="electrical-engineering">Electrical Engineering</option>
                                            <option value="chemical-engineering">Chemical Engineering</option>
                                            <option value="aerospace-engineering">Aerospace Engineering</option>
                                            <option value="marine-engineering">Marine Engineering</option>
                                            <option value="robotics">Robotics</option>
                                            <option value="cybersecurity">Cybersecurity</option>
                                            <option value="artificial-intelligence">Artificial Intelligence</option>
                                            <option value="data-science">Data Science</option>
                                            <option value="web-development">Web Development</option>
                                            <option value="game-development">Game Development</option>
                                            <option value="graphic-design">Graphic Design</option>
                                            <option value="animation">Animation</option>
                                            <option value="film-studies">Film Studies</option>
                                            <option value="photography">Photography</option>
                                            <option value="creative-writing">Creative Writing</option>
                                            <option value="journalism">Journalism</option>
                                            <option value="marketing">Marketing</option>
                                            <option value="advertising">Advertising</option>
                                            <option value="public-relations">Public Relations</option>
                                            <option value="tourism">Tourism</option>
                                            <option value="hospitality">Hospitality</option>
                                            <option value="event-management">Event Management</option>
                                            <option value="sports-management">Sports Management</option>
                                            <option value="python">Python</option>
                                            <option value="javascript">JavaScript</option>
                                            <option value="java">Java</option>
                                            <option value="c">C</option>
                                            <option value="cpp">C++</option>
                                            <option value="csharp">C#</option>
                                            <option value="ruby">Ruby</option>
                                            <option value="php">PHP</option>
                                            <option value="swift">Swift</option>
                                            <option value="objective-c">Objective-C</option>
                                            <option value="kotlin">Kotlin</option>
                                            <option value="typescript">TypeScript</option>
                                            <option value="go">Go</option>
                                            <option value="rust">Rust</option>
                                            <option value="perl">Perl</option>
                                            <option value="r">R</option>
                                            <option value="matlab">MATLAB</option>
                                            <option value="scala">Scala</option>
                                            <option value="groovy">Groovy</option>
                                            <option value="lua">Lua</option>
                                            <option value="haskell">Haskell</option>
                                            <option value="clojure">Clojure</option>
                                            <option value="elixir">Elixir</option>
                                            <option value="erlang">Erlang</option>
                                            <option value="dart">Dart</option>
                                            <option value="bash">Bash</option>
                                            <option value="powershell">PowerShell</option>
                                            <option value="sql">SQL</option>
                                            <option value="html">HTML</option>
                                            <option value="css">CSS</option>
                                            <option value="xml">XML</option>
                                            <option value="json">JSON</option>
                                            <option value="yaml">YAML</option>
                                            <option value="shell-script">Shell Script</option>
                                            <option value="sas">SAS</option>
                                            <option value="racket">Racket</option>
                                            <option value="fsharp">F#</option>
                                            <option value="scheme">Scheme</option>
                                            <option value="fortran">Fortran</option>
                                            <option value="cobol">COBOL</option>
                                            <option value="lisp">Lisp</option>
                                            <option value="smalltalk">Smalltalk</option>
                                            <option value="ada">Ada</option>
                                            <option value="assembly">Assembly</option>
                                            <option value="vbscript">VBScript</option>
                                            <option value="typescript">TypeScript</option>
                                            <option value="julia">Julia</option>
                                            <option value="pascal">Pascal</option>
                                            <option value="vhdl">VHDL</option>
                                            <option value="verilog">Verilog</option>
                                            <option value="solidity">Solidity</option>
                                            <option value="rpg">RPG</option>
                                            <option value="awk">AWK</option>
                                            <option value="tcl">Tcl</option>
                                            <option value="actionscript">ActionScript</option>
                                            <option value="prolog">Prolog</option>
                                            <option value="elm">Elm</option>
                                            <option value="ocaml">OCaml</option>
                                            <option value="f">F</option>
                                            <option value="nim">Nim</option>
                                            <option value="crystal">Crystal</option>
                                            <option value="cobol">COBOL</option>
                                        </select>

                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label="Total Marks" name="totalMarks">
                                        <input type="number" />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label="Passing Marks" name="passingMarks">
                                        <input type="number" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <div className="flex justify-end gap-2">
                                <button
                                    className="primary-outlined-btn"
                                    type="button"
                                    onClick={() => navigate("/admin/exams")}
                                >
                                    Cancel
                                </button>
                                <button className="primary-contained-btn" type="submit">
                                    Save
                                </button>
                            </div>
                        </TabPane>
                        {params.id && (
                            <TabPane tab="Questions" key="2">
                                <div className="flex justify-end">
                                    <button
                                        className="primary-outlined-btn"
                                        type="button"
                                        onClick={() => setShowAddEditQuestionModal(true)}
                                    >
                                        Add Question
                                    </button>
                                </div>

                                <Table
                                    columns={questionsColumns}
                                    dataSource={examData?.questions || []}
                                />
                            </TabPane>
                        )}
                    </Tabs>
                </Form>
            )}

            {showAddEditQuestionModal && (
                <AddEditQuestion
                    setShowAddEditQuestionModal={setShowAddEditQuestionModal}
                    showAddEditQuestionModal={showAddEditQuestionModal}
                    examId={params.id}
                    refreshData={getExamData}
                    selectedQuestion={selectedQuestion}
                    setSelectedQuestion={setSelectedQuestion}
                />
            )}
        </div>
    );
}

export default AddEditExam;