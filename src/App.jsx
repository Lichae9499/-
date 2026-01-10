import React, { useState } from 'react';
import { Brain, ArrowRight, ArrowLeft, Check } from 'lucide-react';

// ADHD测试问题数据 - 成人版 (ASRS-v1.1)
const adultQuestions = [
  // A部分 - 注意力不集中
  { id: 1, text: "当必须进行一件枯燥或困难的计划时，你会多常想起或忘记？", section: "A", category: "注意力缺失" },
  { id: 2, text: "当正在做枯燥或重复性的工作时，你多常持续专注的困难？", section: "A", category: "注意力缺失" },
  { id: 3, text: "即使有人直接对你说话，你会多常有困难专注于别人跟你讲话的内容？", section: "A", category: "注意力缺失" },
  { id: 4, text: "一旦完成任何计划中最具挑战的部分后，你多常有完成计划最后细节的困难？", section: "A", category: "注意力缺失" },
  { id: 5, text: "当必须做事要有组织规划性的任务时，你会多常因难以找得到次序？", section: "A", category: "注意力缺失" },
  { id: 6, text: "当有一件需要多费心思考的工作时，你会多常选避或是延后开始去做？", section: "A", category: "注意力缺失" },
  { id: 7, text: "在家里或是在工作时，你会多常没有找把东西放在对的地方或是找不到东西？", section: "A", category: "注意力缺失" },
  { id: 8, text: "你会多常因身旁的活动或噪音而分心？", section: "A", category: "注意力缺失" },
  { id: 9, text: "你会多常有问题去记得约会或是必须准备做的事？", section: "A", category: "注意力缺失" },
  
  // B部分 - 过动/冲动
  { id: 10, text: "当必须长时间坐着者，你会多常坐不安稳或手脚扭动？", section: "B", category: "过动冲动" },
  { id: 11, text: "你会多常在开会时或在其他被其坐好的场合中难以座位？", section: "B", category: "过动冲动" },
  { id: 12, text: "你会多常觉得静不下來或感到不安？", section: "B", category: "过动冲动" },
  { id: 13, text: "当有自己独处的时间时，你会多常觉得有困难使自己平静和放松？", section: "B", category: "过动冲动" },
  { id: 14, text: "你会多常像被马达所驱动一样，总是自己停不下來，不得不做事情？", section: "B", category: "过动冲动" },
  { id: 15, text: "你会多常发现自己说话太多，特别是在社交场合？", section: "B", category: "过动冲动" },
  { id: 16, text: "当你在交谈时，你会多常发现自己在对方话语还未说完之前，你已经抢着把话说了？", section: "B", category: "过动冲动" },
  { id: 17, text: "当必须排队时，你会多常有困难等待轮到你？", section: "B", category: "过动冲动" },
  { id: 18, text: "你会多常中断或打扰到其他正在忙碌的人？", section: "B", category: "过动冲动" }
];

// ADHD测试问题数据 - 儿童版 (Vanderbilt评定量表)
const childQuestions = [
  // A部分
  { id: 1, text: "难于注意细节或犯粗心的错误，例如：家课", section: "A", category: "注意力缺失" },
  { id: 2, text: "对应该做的事难于保持注意力", section: "A", category: "注意力缺失" },
  { id: 3, text: "当对其说话时似乎没聆听", section: "A", category: "注意力缺失" },
  { id: 4, text: "不能完整地执行指令或不能完成作业（并非由于听不懂指令或由于对抗行为所致）", section: "A", category: "注意力缺失" },
  { id: 5, text: "对进行任务或活动时缺乏整体组织能力", section: "A", category: "注意力缺失" },
  { id: 6, text: "过避、不喜欢或不愿参与与需集中注意力的工作", section: "A", category: "注意力缺失" },
  { id: 7, text: "遗失对学习或活动所必需的东西（如作业本、铅笔或书）", section: "A", category: "注意力缺失" },
  { id: 8, text: "容易被外界刺激分散注意力，例如：嘈音或其他", section: "A", category: "注意力缺失" },
  { id: 9, text: "在日常活动中容易忘事", section: "A", category: "注意力缺失" },
  
  // B部分
  { id: 10, text: "在座位上手脚不停的震动或不能坐定", section: "B", category: "过动冲动" },
  { id: 11, text: "在需保持坐位的环境中擅自离开坐位", section: "B", category: "过动冲动" },
  { id: 12, text: "在需保持坐位的环境中过多地走动或攀爬", section: "B", category: "过动冲动" },
  { id: 13, text: "在娱乐活动中难于保持安静", section: "B", category: "过动冲动" },
  { id: 14, text: "总是活动力很强或像「被马达驱使着」一样", section: "B", category: "过动冲动" },
  { id: 15, text: "过分爱讲话", section: "B", category: "过动冲动" },
  { id: 16, text: "未等问题被问完即抢先说出答案", section: "B", category: "过动冲动" },
  { id: 17, text: "不能耐心排接等待", section: "B", category: "过动冲动" },
  { id: 18, text: "打断别人谈话", section: "B", category: "过动冲动" }
];

const adultOptions = [
  { value: 0, label: "从不", emoji: "😊", color: "emerald" },
  { value: 1, label: "很少", emoji: "🙂", color: "green" },
  { value: 2, label: "有时", emoji: "😐", color: "yellow" },
  { value: 3, label: "经常", emoji: "😟", color: "orange" },
  { value: 4, label: "总是", emoji: "😰", color: "red" }
];

const childOptions = [
  { value: 0, label: "从不", emoji: "😊", color: "emerald" },
  { value: 1, label: "很少", emoji: "🙂", color: "green" },
  { value: 2, label: "有时", emoji: "😐", color: "yellow" },
  { value: 3, label: "经常", emoji: "😟", color: "orange" },
  { value: 4, label: "总是", emoji: "😰", color: "red" }
];

export default function ADHDTest() {
  const [currentStep, setCurrentStep] = useState('welcome'); // welcome, test, results
  const [testType, setTestType] = useState(null); // 'adult' or 'child'
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [symptomsExpanded, setSymptomsExpanded] = useState(false); // 突出症状清单展开状态
  const [impactExpanded, setImpactExpanded] = useState(false); // 生活影响评估展开状态
  const [comparisonExpanded, setComparisonExpanded] = useState(false); // 分数对比与参照展开状态

  // 根据测试类型选择问题和选项
  const questions = testType === 'child' ? childQuestions : adultQuestions;
  const options = testType === 'child' ? childOptions : adultOptions;
  const maxScore = 72; // 两个版本都是72分：成人版4分制18题，儿童版4分制18题

  const handleAnswer = (value) => {
    const newAnswers = { ...answers, [questions[currentQuestion].id]: value };
    setAnswers(newAnswers);
    
    // 自动进入下一题
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        // 所有问题回答完毕，显示结果
        setCurrentStep('results');
      }
    }, 300);
  };

  const goToPrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateResults = () => {
    const sectionA = questions.slice(0, 9).reduce((sum, q) => sum + (answers[q.id] || 0), 0);
    const sectionB = questions.slice(9, 18).reduce((sum, q) => sum + (answers[q.id] || 0), 0);
    const total = sectionA + sectionB;
    
    return { sectionA, sectionB, total };
  };

  const getSeverityLevel = (score, type) => {
    // 两个版本都是满分72分，使用相同的评估标准
    if (score < 17) return { level: "低风险", color: "emerald", emoji: "✨", description: "症状较轻" };
    if (score < 24) return { level: "轻度", color: "yellow", emoji: "💛", description: "有轻度症状" };
    if (score < 31) return { level: "中度", color: "orange", emoji: "🧡", description: "有中度症状" };
    return { level: "重度", color: "red", emoji: "❤️", description: "症状明显" };
  };

  // 生成详细评估报告
  const getDetailedReport = (total, sectionA, sectionB, testType) => {
    const percentage = Math.round((total / 72) * 100);
    const severity = getSeverityLevel(total, testType);
    
    let levelDescription = "";
    let impactDescription = "";
    let encouragement = "";
    
    if (total < 17) {
      levelDescription = `您的总分为${total}分（满分72分），处于较低水平。这表明您当前经历的ADHD相关症状较少，对日常生活的影响相对有限。`;
      impactDescription = `虽然得分较低，但如果您在某些特定情境下仍感到困扰，建议关注这些具体场景。`;
      encouragement = `继续保持良好的生活习惯和工作方式。如果未来出现明显变化，可以重新进行评估。`;
    } else if (total < 24) {
      levelDescription = `您的总分为${total}分（满分72分），处于轻度水平。这表明您可能正在经历一些ADHD相关症状，这些症状可能在某些情况下对您的生活造成轻微影响。`;
      impactDescription = `根据您的答案，主要困难可能体现在注意力维持、任务组织或冲动控制等方面。这些症状的程度尚属可管理范围，但值得关注。`;
      encouragement = `ADHD是一种神经发育差异，而不是性格缺陷或意志力问题。通过适当的自我管理策略和生活调整，大多数症状都能得到有效改善。如果症状持续影响您的生活质量，建议咨询专业医疗人员。`;
    } else if (total < 31) {
      levelDescription = `您的总分为${total}分（满分72分），处于中度水平（前${100-percentage}%）。这表明您可能正在经历较为明显的ADHD相关症状，这些症状可能已经对您的日常生活、工作表现或人际关系产生了一定程度的影响。`;
      impactDescription = `根据您的答案，主要困难可能集中在：工作中难以保持注意力、组织任务困难、容易被外界分心、日常活动中健忘、冲动行为等方面。这些症状的严重程度已经达到了需要重视的水平。`;
      encouragement = `重要的是要认识到，ADHD是一种神经发育差异，而不是性格缺陷或意志力问题。通过适当的支持和管理策略，大多数ADHD人群都能够充分发挥潜力，过上充实的生活。建议您寻求专业医疗评估，以获得准确诊断和个性化的治疗方案。`;
    } else {
      levelDescription = `您的总分为${total}分（满分72分），处于较高水平（前${100-percentage}%）。这表明您可能正在经历显著的ADHD相关症状，这些症状可能已经对您的日常生活、工作表现和人际关系产生了明显影响。`;
      impactDescription = `根据您的答案，主要困难集中在：工作中难以保持注意力、组织任务困难、容易被外界分心、日常活动中健忘、经常打断他人说话、难以等待等方面。这些症状的严重程度已经达到了需要专业关注的水平。`;
      encouragement = `重要的是要认识到，ADHD是一种神经发育差异，而不是性格缺陷或意志力问题。通过适当的支持和管理策略，大多数ADHD成人都能够充分发挥潜力，过上充实的生活。**强烈建议您寻求专业医疗评估**，以获得准确诊断和个性化的治疗方案。`;
    }
    
    return { levelDescription, impactDescription, encouragement };
  };

  // 获取突出症状清单
  const getHighlightedSymptoms = () => {
    const symptoms = [];
    questions.forEach(q => {
      const answer = answers[q.id];
      // 选择了"经常"(3)或"总是"(4)的题目
      if (answer >= 3) {
        symptoms.push({
          text: q.text,
          id: q.id,
          section: q.section
        });
      }
    });
    return symptoms.slice(0, 8); // 最多显示8个
  };

  // 判断主导类型
  const getDominantType = (sectionA, sectionB) => {
    const diff = Math.abs(sectionA - sectionB);
    if (diff <= 6) {
      return {
        type: "混合型",
        emoji: "🔄",
        color: "purple",
        description: "您的测试结果显示注意力缺陷和多动冲动症状同时存在，这是ADHD最复杂的表现形式。您可能同时经历：注意力难以集中、组织困难、坐立不安、冲动决策等多重挑战。这种类型需要更全面的管理策略，既要处理注意力问题，也要管理冲动行为。",
        strengths: "优势是您可能具有创造力强、思维活跃、适应变化能力强等特点。",
        suggestion: "建议采用综合管理方法，可能需要专业医疗支持。"
      };
    } else if (sectionA > sectionB) {
      return {
        type: "注意力缺陷主导型",
        emoji: "🎯",
        color: "blue",
        description: "您的测试结果显示注意力缺陷症状更为突出。您可能主要在以下方面遇到困难：长时间专注、完成任务、记住细节、组织规划等。这种类型的人通常表现为\"内向型\"ADHD，症状不如多动型明显，但同样影响生活质量。",
        strengths: "您可能具有深度思考能力、创造性思维、对感兴趣领域的专注力等优势。",
        suggestion: "建议重点改善时间管理、任务分解、环境优化等策略。"
      };
    } else {
      return {
        type: "多动冲动主导型",
        emoji: "⚡",
        color: "green",
        description: "您的测试结果显示多动冲动症状更为突出。您可能主要表现为：难以静坐、过度活跃、冲动决策、打断他人等。这种类型的ADHD通常更容易被察觉，但也更容易得到理解和支持。",
        strengths: "您可能具有行动力强、反应迅速、精力充沛、善于应对突发情况等优势。",
        suggestion: "建议重点练习冲动控制、情绪管理、社交技巧等策略。"
      };
    }
  };

  // 获取影响领域评估
  const getImpactAreas = (sectionA, sectionB) => {
    return [
      {
        name: "工作/学业表现",
        icon: "💼",
        score: Math.min(100, Math.round((sectionA / 36) * 100)),
        level: sectionA >= 27 ? "高度影响" : sectionA >= 18 ? "中度影响" : "轻度影响",
        description: "注意力维持、任务完成、时间管理等方面的困难",
        color: sectionA >= 27 ? "red" : sectionA >= 18 ? "orange" : "green"
      },
      {
        name: "人际关系",
        icon: "👥",
        score: Math.min(100, Math.round((sectionB / 36) * 100)),
        level: sectionB >= 27 ? "高度影响" : sectionB >= 18 ? "中度影响" : "轻度影响",
        description: "冲动行为、打断他人、情绪控制等对社交的影响",
        color: sectionB >= 27 ? "red" : sectionB >= 18 ? "orange" : "green"
      },
      {
        name: "日常生活管理",
        icon: "🏠",
        score: Math.min(100, Math.round(((sectionA * 0.7 + sectionB * 0.3) / 36) * 100)),
        level: sectionA >= 24 ? "高度影响" : sectionA >= 15 ? "中度影响" : "轻度影响",
        description: "组织规划、记忆、物品管理等日常事务",
        color: sectionA >= 24 ? "red" : sectionA >= 15 ? "orange" : "green"
      },
      {
        name: "情绪调节",
        icon: "💭",
        score: Math.min(100, Math.round(((sectionB * 0.8 + sectionA * 0.2) / 36) * 100)),
        level: sectionB >= 24 ? "高度影响" : sectionB >= 15 ? "中度影响" : "轻度影响",
        description: "冲动情绪、焦虑、挫折耐受等情绪管理能力",
        color: sectionB >= 24 ? "red" : sectionB >= 15 ? "orange" : "green"
      }
    ];
  };


  const WelcomeScreen = () => (
    <div className="min-h-screen flex items-center justify-center p-4" 
         style={{
           background: `
             linear-gradient(45deg, transparent 30%, rgba(146, 180, 115, 0.05) 30%, rgba(146, 180, 115, 0.05) 32%, transparent 32%),
             linear-gradient(-45deg, transparent 68%, rgba(146, 180, 115, 0.06) 68%, rgba(146, 180, 115, 0.06) 70%, transparent 70%),
             radial-gradient(circle at 20% 30%, rgba(146, 180, 115, 0.18) 0%, transparent 50%),
             radial-gradient(circle at 80% 70%, rgba(146, 180, 115, 0.15) 0%, transparent 50%),
             radial-gradient(circle at 40% 80%, rgba(146, 180, 115, 0.12) 0%, transparent 40%),
             radial-gradient(circle at 90% 20%, rgba(146, 180, 115, 0.1) 0%, transparent 35%),
             radial-gradient(circle at 60% 50%, rgba(146, 180, 115, 0.08) 0%, transparent 45%),
             linear-gradient(135deg, #f1eddf 0%, #e8deb8 50%, #f2dc99 100%)
           `,
           backgroundSize: '100px 100px, 100px 100px, 100% 100%, 100% 100%, 100% 100%, 100% 100%, 100% 100%, 100% 100%'
         }}>
      <div className="max-w-lg w-full">
        <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-6 md:p-8 text-center transform hover:scale-[1.02] transition-all duration-300">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full mb-6 animate-pulse">
            <Brain className="w-12 h-12 text-white" />
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
            ADHD 自测问卷
          </h1>
          
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            专业的注意力缺陷/多动障碍评估工具
          </p>

          {!testType ? (
            // 选择测试类型
            <>
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-400 mb-4 flex items-center justify-center gap-2">
                  <span className="text-2xl">👤</span>
                  请选择测试对象
                </h2>
              </div>

              <div className="space-y-4 mb-6">
                <button
                  onClick={() => setTestType('adult')}
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-2xl hover:from-orange-600 hover:to-orange-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-4xl flex-shrink-0">🧑</span>
                    <div className="text-left">
                      <div className="text-xl font-bold mb-1">成人版测试</div>
                      <div className="text-sm text-orange-100">ASRS-v1.1 成人量表 · 适用18岁以上</div>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => setTestType('child')}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-2xl hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-4xl flex-shrink-0">👶</span>
                    <div className="text-left flex-1">
                      <div className="text-xl font-bold mb-1">儿童版测试</div>
                      <div className="text-sm text-green-100 mb-2">Vanderbilt量表 · 适用6-18岁儿童</div>
                      <div className="text-xs text-green-50 bg-green-600/30 rounded-lg px-3 py-2 flex items-start gap-2">
                        <span className="flex-shrink-0">💡</span>
                        <span>需要由家长或监护人根据孩子的表现进行评估</span>
                      </div>
                    </div>
                  </div>
                </button>
              </div>

              {/* 重要声明 - 移到选择框下方 */}
              <div className="bg-gray-50 border-2 border-gray-200 rounded-2xl p-5">
                <div className="flex items-start gap-3">
                  <span className="text-2xl flex-shrink-0">⚠️</span>
                  <div className="text-left">
                    <h3 className="text-base font-bold text-gray-800 mb-2">重要声明</h3>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p><strong>本测试仅供参考，不能替代专业医疗诊断。</strong></p>
                      <p>测试结果不作为医疗诊断依据，如有疑虑请及时咨询专业医生。</p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            // 显示测试说明
            <>
              <div className="mb-4 flex items-center justify-center gap-3">
                <span className="text-3xl">{testType === 'adult' ? '🧑' : '👶'}</span>
                <span className="text-lg font-bold text-gray-700">
                  {testType === 'adult' ? '成人版测试' : '儿童版测试'}
                </span>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-5 mb-6 border-2 border-orange-200">
                <h2 className="text-xl font-bold text-orange-900 mb-4 flex items-center justify-center gap-2">
                  <span className="text-2xl">📋</span>
                  测试说明
                </h2>
                <div className="text-left space-y-3 text-base text-gray-700">
                  <p className="flex items-start gap-3">
                    <span className="text-2xl flex-shrink-0">✅</span>
                    <span><strong className="text-orange-700">共 18 道题</strong>，每题选择最符合{testType === 'adult' ? '您' : '孩子'}情况的选项</span>
                  </p>
                  <p className="flex items-start gap-3">
                    <span className="text-2xl flex-shrink-0">⏱️</span>
                    <span><strong className="text-orange-700">回忆过去 6 个月</strong>的真实{testType === 'adult' ? '感受和经历' : '表现'}</span>
                  </p>
                  <p className="flex items-start gap-3">
                    <span className="text-2xl flex-shrink-0">🎯</span>
                    <span><strong className="text-orange-700">诚实作答</strong>，测评结果仅供参考</span>
                  </p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => setTestType(null)}
                  className="flex-1 bg-gray-200 text-gray-700 text-base font-bold py-3 px-4 rounded-2xl hover:bg-gray-300 transition-all duration-300"
                >
                  返回选择
                </button>
                <button
                  onClick={() => setCurrentStep('test')}
                  className="flex-[2] group bg-gradient-to-r from-orange-500 to-amber-500 text-white text-lg font-bold py-4 px-6 rounded-2xl hover:from-orange-600 hover:to-amber-600 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center justify-center gap-3"
                >
                  <span className="text-2xl">🚀</span>
                  开始测试
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );

  const TestScreen = () => {
    const currentQ = questions[currentQuestion];
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    const selectedAnswer = answers[currentQ.id];

    return (
      <div className="min-h-screen p-4 py-8"
           style={{
             background: `
               linear-gradient(45deg, transparent 30%, rgba(146, 180, 115, 0.05) 30%, rgba(146, 180, 115, 0.05) 32%, transparent 32%),
               linear-gradient(-45deg, transparent 68%, rgba(146, 180, 115, 0.06) 68%, rgba(146, 180, 115, 0.06) 70%, transparent 70%),
               radial-gradient(circle at 20% 30%, rgba(146, 180, 115, 0.18) 0%, transparent 50%),
               radial-gradient(circle at 80% 70%, rgba(146, 180, 115, 0.15) 0%, transparent 50%),
               radial-gradient(circle at 40% 80%, rgba(146, 180, 115, 0.12) 0%, transparent 40%),
               radial-gradient(circle at 90% 20%, rgba(146, 180, 115, 0.1) 0%, transparent 35%),
               radial-gradient(circle at 60% 50%, rgba(146, 180, 115, 0.08) 0%, transparent 45%),
               linear-gradient(135deg, #f1eddf 0%, #e8deb8 50%, #f2dc99 100%)
             `,
             backgroundSize: '100px 100px, 100px 100px, 100% 100%, 100% 100%, 100% 100%, 100% 100%, 100% 100%, 100% 100%'
           }}>
        <div className="max-w-lg mx-auto">
          {/* 进度条 */}
          <div className="mb-6 bg-white/90 backdrop-blur rounded-2xl p-5 shadow-xl">
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="text-2xl">{testType === 'adult' ? '🧑' : '👶'}</span>
              <span className="text-sm font-semibold text-gray-600">
                {testType === 'adult' ? '成人版测试' : '儿童版测试'}
              </span>
            </div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-lg font-bold text-orange-900">
                第 {currentQuestion + 1} 题 / 共 {questions.length} 题
              </span>
              <span className="text-base font-semibold text-orange-700">
                {Math.round(progress)}% 完成
              </span>
            </div>
            <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-orange-500 to-amber-500 transition-all duration-500 ease-out rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* 问题卡片 */}
          <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-6 md:p-7 mb-6 transform hover:scale-[1.01] transition-all duration-300">
            <div className="mb-6">
              <span className={`inline-block px-4 py-2 rounded-full text-sm font-bold mb-4 ${
                currentQ.section === 'A' 
                  ? 'bg-orange-100 text-orange-700' 
                  : 'bg-green-100 text-green-700'
              }`}>
                {currentQ.section === 'A' ? '📝 Part A - 注意力缺失' : '⚡ Part B - 过动冲动'}
              </span>
            </div>

            <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-6 leading-relaxed">
              {currentQ.text}
            </h2>

            <div className="space-y-4">
              {options.map((option) => {
                const isSelected = selectedAnswer === option.value;
                const getButtonStyle = () => {
                  if (!isSelected) return 'border-gray-200 bg-white hover:shadow-md';
                  
                  switch(option.color) {
                    case 'emerald': return 'border-emerald-500 bg-gradient-to-r from-emerald-50 to-emerald-100 shadow-lg scale-[1.02]';
                    case 'green': return 'border-green-500 bg-gradient-to-r from-green-50 to-green-100 shadow-lg scale-[1.02]';
                    case 'yellow': return 'border-yellow-500 bg-gradient-to-r from-yellow-50 to-yellow-100 shadow-lg scale-[1.02]';
                    case 'orange': return 'border-orange-500 bg-gradient-to-r from-orange-50 to-orange-100 shadow-lg scale-[1.02]';
                    case 'red': return 'border-red-500 bg-gradient-to-r from-red-50 to-red-100 shadow-lg scale-[1.02]';
                    default: return 'border-gray-200 bg-white';
                  }
                };
                
                const getCheckColor = () => {
                  switch(option.color) {
                    case 'emerald': return 'text-emerald-600';
                    case 'green': return 'text-green-600';
                    case 'yellow': return 'text-yellow-600';
                    case 'orange': return 'text-orange-600';
                    case 'red': return 'text-red-600';
                    default: return 'text-gray-600';
                  }
                };
                
                return (
                  <button
                    key={option.value}
                    onClick={() => handleAnswer(option.value)}
                    className={`w-full p-4 rounded-2xl border-2 transition-all duration-300 transform hover:scale-[1.02] text-left ${getButtonStyle()}`}
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-3xl">{option.emoji}</span>
                      <div className="flex-1">
                        <span className="text-base md:text-lg font-bold text-gray-800">
                          {option.label}
                        </span>
                      </div>
                      {isSelected && (
                        <Check className={`w-7 h-7 ${getCheckColor()}`} />
                      )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* 导航按钮 */}
          <div className="flex gap-4">
            {currentQuestion > 0 && (
              <button
                onClick={goToPrevious}
                className="flex-1 bg-white/90 backdrop-blur text-orange-700 font-bold py-4 px-6 rounded-2xl hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 text-lg"
              >
                <ArrowLeft className="w-5 h-5" />
                上一题
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  const ResultsScreen = () => {
    const { sectionA, sectionB, total } = calculateResults();
    const severity = getSeverityLevel(total, testType);
    const sectionMaxScore = 36; // 两个版本每section都是36分（9题×4分）
    const detailedReport = getDetailedReport(total, sectionA, sectionB, testType);
    const highlightedSymptoms = getHighlightedSymptoms();
    const dominantType = getDominantType(sectionA, sectionB);
    const impactAreas = getImpactAreas(sectionA, sectionB);
    const percentile = Math.round((1 - total / 72) * 100);

    return (
      <div className="min-h-screen p-4 py-8"
           style={{
             background: `
               linear-gradient(45deg, transparent 30%, rgba(146, 180, 115, 0.05) 30%, rgba(146, 180, 115, 0.05) 32%, transparent 32%),
               linear-gradient(-45deg, transparent 68%, rgba(146, 180, 115, 0.06) 68%, rgba(146, 180, 115, 0.06) 70%, transparent 70%),
               radial-gradient(circle at 20% 30%, rgba(146, 180, 115, 0.18) 0%, transparent 50%),
               radial-gradient(circle at 80% 70%, rgba(146, 180, 115, 0.15) 0%, transparent 50%),
               radial-gradient(circle at 40% 80%, rgba(146, 180, 115, 0.12) 0%, transparent 40%),
               radial-gradient(circle at 90% 20%, rgba(146, 180, 115, 0.1) 0%, transparent 35%),
               radial-gradient(circle at 60% 50%, rgba(146, 180, 115, 0.08) 0%, transparent 45%),
               linear-gradient(135deg, #f1eddf 0%, #e8deb8 50%, #f2dc99 100%)
             `,
             backgroundSize: '100px 100px, 100px 100px, 100% 100%, 100% 100%, 100% 100%, 100% 100%, 100% 100%, 100% 100%'
           }}>
        <div className="max-w-lg mx-auto">
          {/* 完成标志 */}
          <div className="text-center mb-6 animate-bounce">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-full mb-3">
              <Check className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">测试完成！</h1>
            <p className="text-lg text-white/90">感谢您的认真作答</p>
          </div>

          {/* 总分卡片 */}
          <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-6 mb-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="text-2xl">{testType === 'adult' ? '🧑' : '👶'}</span>
              <span className="text-sm font-semibold text-gray-600">
                {testType === 'adult' ? '成人版测试结果' : '儿童版测试结果'}
              </span>
            </div>
            <h2 className="text-xl font-bold text-gray-700 mb-3">总分</h2>
            <div className="text-6xl font-bold mb-2 bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
              {total}
            </div>
            <div className="text-2xl text-gray-500 mb-4">/ {maxScore}</div>
            
            <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-full text-white text-xl font-bold shadow-lg ${
              severity.color === 'emerald' ? 'bg-gradient-to-r from-emerald-400 to-emerald-500' :
              severity.color === 'yellow' ? 'bg-gradient-to-r from-yellow-400 to-yellow-500' :
              severity.color === 'orange' ? 'bg-gradient-to-r from-orange-400 to-orange-500' :
              'bg-gradient-to-r from-red-400 to-red-500'
            }`}>
              <span className="text-2xl">{severity.emoji}</span>
              <span>{severity.level}</span>
            </div>
            <p className="text-base text-gray-600 mt-3">{severity.description}</p>
          </div>

          {/* 维度详情 */}
          <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-6 mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-5 flex items-center gap-3">
              <span className="text-2xl">🎯</span>
              维度详情
            </h3>
            
            <div className="space-y-4">
              {[
                { name: "注意力持续", score: sectionA, max: sectionMaxScore, barClass: "bg-gradient-to-r from-orange-400 to-orange-500", icon: "🔍" },
                { name: "组织规划", score: Math.floor(sectionA * 0.7), max: sectionMaxScore, barClass: "bg-gradient-to-r from-amber-400 to-amber-500", icon: "📋" },
                { name: "冲动控制", score: sectionB, max: sectionMaxScore, barClass: "bg-gradient-to-r from-green-400 to-green-500", icon: "🎭" },
                { name: "情绪调节", score: Math.floor(sectionB * 0.8), max: sectionMaxScore, barClass: "bg-gradient-to-r from-lime-400 to-lime-500", icon: "💭" }
              ].map((dimension, idx) => (
                <div key={idx} className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{dimension.icon}</span>
                      <span className="font-bold text-base text-gray-800">{dimension.name}</span>
                    </div>
                    <span className="font-bold text-lg text-gray-700">
                      {dimension.score} / {dimension.max}
                    </span>
                  </div>
                  <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-1000 ${dimension.barClass}`}
                      style={{ 
                        width: `${(dimension.score / dimension.max) * 100}%`,
                        transitionDelay: `${idx * 100}ms`
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 症状类型分析 */}
          <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-6 mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-5 flex items-center gap-3">
              <span className="text-2xl">📊</span>
              症状类型分析
            </h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              {/* 注意力缺失 */}
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-5 border-2 border-orange-200">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">📝</span>
                  <h4 className="text-lg font-bold text-orange-900">注意力缺失</h4>
                </div>
                <div className="mb-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xl font-bold text-orange-700">{sectionA}</span>
                    <span className="text-base text-gray-600">/ {sectionMaxScore}</span>
                  </div>
                  <div className="h-3 bg-orange-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full transition-all duration-1000"
                      style={{ width: `${(sectionA / sectionMaxScore) * 100}%` }}
                    />
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  包括注意力维持困难、容易分心、组织规划问题等表现
                </p>
              </div>

              {/* 过动冲动 */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-5 border-2 border-green-200">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">⚡</span>
                  <h4 className="text-lg font-bold text-green-900">过动冲动</h4>
                </div>
                <div className="mb-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xl font-bold text-green-700">{sectionB}</span>
                    <span className="text-base text-gray-600">/ {sectionMaxScore}</span>
                  </div>
                  <div className="h-3 bg-green-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full transition-all duration-1000"
                      style={{ width: `${(sectionB / sectionMaxScore) * 100}%` }}
                    />
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  包括坐不住、难以安静、话多、打断他人等表现
                </p>
              </div>
            </div>
            
            {/* 主导类型 */}
            <div className="mt-5 p-5 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border-2 border-purple-200">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{dominantType.emoji}</span>
                <div>
                  <h4 className="text-lg font-bold text-purple-900">主导类型</h4>
                  <p className="text-sm text-purple-700">{dominantType.type}</p>
                </div>
              </div>
              
              <p className="text-gray-700 leading-relaxed mb-3">
                {dominantType.description}
              </p>
              
              <p className="text-gray-600 text-sm bg-white/50 rounded-lg p-3 mb-2">
                <strong className="text-gray-800">💪 优势特点：</strong>
                {dominantType.strengths}
              </p>
              
              <p className="text-gray-600 text-sm bg-white/50 rounded-lg p-3">
                <strong className="text-gray-800">📌 管理建议：</strong>
                {dominantType.suggestion}
              </p>
            </div>
          </div>

          {/* 详细评估报告 */}
          <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-6 mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-5 flex items-center gap-3">
              <span className="text-2xl">📝</span>
              详细评估结果
            </h3>
            
            <div className="space-y-4 text-base text-gray-700 leading-relaxed">
              <p>
                <strong className="text-gray-900">{detailedReport.levelDescription}</strong>
                {detailedReport.impactDescription}
              </p>
              
              <p className="bg-blue-50 border-l-4 border-blue-500 pl-4 py-3 rounded-r-lg">
                <strong className="text-blue-900">关于ADHD：</strong>
                <span className="text-blue-800">ADHD（注意力缺陷多动障碍）是一种神经发育差异，影响大脑执行功能的发展。这不是性格缺陷、懒惰或缺乏意志力，而是大脑某些区域的功能特点。根据DSM-5诊断标准，ADHD的症状通常在12岁前出现，并在多个场合（如家庭、学校、工作）中持续存在。</span>
              </p>
              
              <p>{detailedReport.encouragement}</p>
            </div>
          </div>

          {/* 突出症状清单 - 带展开/收起功能 */}
          {highlightedSymptoms.length > 0 && (
            <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-6 mb-6">
              <div 
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setSymptomsExpanded(!symptomsExpanded)}
              >
                <h3 className="text-xl font-bold text-gray-800 flex items-center gap-3">
                  <span className="text-2xl">🎯</span>
                  突出症状表现
                  <span className="text-sm font-normal text-gray-500">
                    （{highlightedSymptoms.length}项）
                  </span>
                </h3>
                <button className="text-2xl text-gray-600 hover:text-gray-800 transition-colors">
                  {symptomsExpanded ? '▲' : '▼'}
                </button>
              </div>
              
              {symptomsExpanded && (
                <>
                  <p className="text-sm text-gray-600 mb-4 mt-5">
                    根据您的答案，以下是您选择"经常"或"总是"的症状项（按题目顺序）：
                  </p>
                  
                  <div className="space-y-3">
                    {highlightedSymptoms.map((symptom, idx) => (
                      <div 
                        key={idx}
                        className="flex items-start gap-3 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border-l-4 border-orange-400"
                      >
                        <span className="flex-shrink-0 w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                          {symptom.id}
                        </span>
                        <div className="flex-1">
                          <p className="text-gray-800">{symptom.text}</p>
                          <span className="text-xs text-gray-500 mt-1 inline-block">
                            {symptom.section === 'A' ? '注意力缺失类' : '过动冲动类'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 p-4 bg-gray-50 rounded-xl">
                    <p className="text-sm text-gray-600">
                      <strong className="text-gray-800">解读说明：</strong>
                      这些是您报告频率最高的症状。如果这些表现已经持续6个月以上，并在多个场合（如工作、家庭、社交）中出现，建议寻求专业评估。
                    </p>
                  </div>
                </>
              )}
            </div>
          )}

          {/* 影响领域评估 - 带展开/收起功能 */}
          <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-6 mb-6">
            <div 
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setImpactExpanded(!impactExpanded)}
            >
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-3">
                <span className="text-2xl">📈</span>
                生活影响评估
              </h3>
              <button className="text-2xl text-gray-600 hover:text-gray-800 transition-colors">
                {impactExpanded ? '▲' : '▼'}
              </button>
            </div>
            
            {impactExpanded && (
              <>
                <p className="text-sm text-gray-600 mb-5 mt-5">
                  根据症状表现，评估ADHD对不同生活领域的影响程度：
                </p>
                
                <div className="grid grid-cols-2 gap-4">
                  {impactAreas.map((area, idx) => (
                    <div 
                      key={idx}
                      className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 border-2 border-gray-200"
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-2xl">{area.icon}</span>
                        <div className="flex-1">
                          <h4 className="font-bold text-sm text-gray-800">{area.name}</h4>
                          <span className={`text-xs font-semibold ${
                            area.level === '高度影响' ? 'text-red-600' : 
                            area.level === '中度影响' ? 'text-orange-600' : 
                            'text-green-600'
                          }`}>
                            {area.level}
                          </span>
                        </div>
                      </div>
                      
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
                        <div 
                          className={`h-full rounded-full transition-all duration-1000 ${
                            area.level === '高度影响' ? 'bg-gradient-to-r from-red-400 to-red-600' : 
                            area.level === '中度影响' ? 'bg-gradient-to-r from-orange-400 to-orange-600' : 
                            'bg-gradient-to-r from-green-400 to-green-600'
                          }`}
                          style={{ 
                            width: `${area.score}%`,
                            transitionDelay: `${idx * 100}ms`
                          }}
                        />
                      </div>
                      
                      <p className="text-xs text-gray-600 leading-relaxed">{area.description}</p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 p-4 bg-blue-50 rounded-xl">
                  <p className="text-sm text-blue-800">
                    <strong>评估说明：</strong>
                    影响程度根据相关症状的严重程度计算。高度影响（>70%）表示该领域受到显著影响，建议重点关注和寻求支持。
                  </p>
                </div>
              </>
            )}
          </div>

          {/* 对比与参照 - 带展开/收起功能 */}
          <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-6 mb-6">
            <div 
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setComparisonExpanded(!comparisonExpanded)}
            >
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-3">
                <span className="text-2xl">📊</span>
                分数对比与参照
              </h3>
              <button className="text-2xl text-gray-600 hover:text-gray-800 transition-colors">
                {comparisonExpanded ? '▲' : '▼'}
              </button>
            </div>
            
            {comparisonExpanded && (
              <div className="mt-5 space-y-5">
              {/* 人群对比 */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-5 border-2 border-blue-200">
                <h4 className="font-bold text-blue-900 mb-4 flex items-center gap-2">
                  <span className="text-xl">👥</span>
                  人群分布对比
                </h4>
                
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-semibold text-gray-700">您的总分位置</span>
                      <span className="text-lg font-bold text-blue-700">{total}分</span>
                    </div>
                    <div className="relative h-8 bg-gradient-to-r from-green-200 via-yellow-200 via-orange-200 to-red-200 rounded-full overflow-hidden">
                      <div 
                        className="absolute h-full w-1 bg-blue-600 shadow-lg"
                        style={{ left: `${(total / 72) * 100}%` }}
                      >
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                          您的位置
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-600 mt-1">
                      <span>0分</span>
                      <span>低风险</span>
                      <span>中度</span>
                      <span>重度</span>
                      <span>72分</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-700 leading-relaxed">
                    您的总分为<strong className="text-blue-700">{total}分</strong>，
                    {total < 17 && "处于较低分数范围，大多数人得分会高于此水平。"}
                    {total >= 17 && total < 24 && "高于约60%的测试者，处于轻度症状范围。"}
                    {total >= 24 && total < 31 && "高于约75%的测试者，处于中度症状范围。"}
                    {total >= 31 && "高于约85%的测试者，处于较高分数范围。"}
                  </p>
                </div>
              </div>
              
              {/* DSM-5参照标准 */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-5 border-2 border-purple-200">
                <h4 className="font-bold text-purple-900 mb-4 flex items-center gap-2">
                  <span className="text-xl">📋</span>
                  DSM-5诊断参照
                </h4>
                
                <div className="space-y-3 text-sm text-gray-700">
                  <p className="leading-relaxed">
                    <strong className="text-purple-900">DSM-5</strong>（《精神疾病诊断与统计手册第五版》）是目前国际通用的精神疾病诊断标准。对于成人ADHD的诊断要求：
                  </p>
                  
                  <div className="bg-white/70 rounded-lg p-4 space-y-2">
                    <div className="flex items-start gap-2">
                      <span className="text-purple-600">✓</span>
                      <div className="flex-1">
                        <strong>症状数量：</strong>需要在注意力缺陷或多动冲动两个类别中，至少有一个类别的症状≥5个
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-purple-600">✓</span>
                      <div className="flex-1">
                        <strong>持续时间：</strong>症状持续至少6个月
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-purple-600">✓</span>
                      <div className="flex-1">
                        <strong>多场景表现：</strong>症状在两个或以上场景中出现（如家庭、工作、社交）
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-purple-600">✓</span>
                      <div className="flex-1">
                        <strong>功能影响：</strong>明显影响社交、学业或职业功能
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-purple-100 rounded-lg p-3">
                    <p className="text-sm">
                      <strong className="text-purple-900">您的情况：</strong>
                      您在本测评中选择"经常"或"总是"的症状共<strong className="text-purple-700">{highlightedSymptoms.length}个</strong>。
                      {highlightedSymptoms.length >= 5 && (
                        <span className="text-purple-800"> 达到DSM-5关注水平，建议进行专业评估。</span>
                      )}
                      {highlightedSymptoms.length < 5 && (
                        <span className="text-purple-800"> 低于DSM-5诊断阈值，但如症状影响生活质量，仍可咨询专业人士。</span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* 重要提示 */}
              <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4">
                <p className="text-sm text-amber-900">
                  <strong className="flex items-center gap-2 mb-2">
                    <span className="text-xl">⚠️</span>
                    重要提示
                  </strong>
                  本测评是筛查工具，不能替代专业诊断。ADHD的诊断需要综合考虑临床访谈、病史、多源信息（家人、同事反馈）等多方面因素。如果测评结果引起您的关注，请咨询精神科医生或心理健康专业人士进行全面评估。
                </p>
              </div>
            </div>
            )}
          </div>

          {/* 建议卡片 */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl shadow-2xl p-6 border-2 border-amber-200 mb-6">
            <h3 className="text-xl font-bold text-amber-900 mb-4 flex items-center gap-3">
              <span className="text-2xl">💡</span>
              专业建议
            </h3>
            <div className="space-y-3 text-base text-gray-700">
              <p className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">✅</span>
                <span>本测试结果<strong className="text-amber-700">仅供参考</strong>，不能作为诊断依据</span>
              </p>
              
              {severity.level === '重度' || severity.level === '中度' ? (
                <>
                  <p className="flex items-start gap-3">
                    <span className="text-2xl flex-shrink-0">🏥</span>
                    <span><strong className="text-red-600">强烈建议</strong>尽快咨询<strong className="text-amber-700">{testType === 'child' ? '儿童精神科医生或儿童心理医生' : '精神科医生或心理医生'}</strong>进行专业评估</span>
                  </p>
                  <p className="flex items-start gap-3">
                    <span className="text-2xl flex-shrink-0">💊</span>
                    <span>专业诊断后，可能需要{testType === 'child' ? '综合干预方案（行为治疗、家庭指导、药物治疗等）' : '综合治疗方案（心理咨询、药物治疗、行为训练等）'}</span>
                  </p>
                </>
              ) : (
                <p className="flex items-start gap-3">
                  <span className="text-2xl flex-shrink-0">👨‍⚕️</span>
                  <span>如有困扰，建议咨询<strong className="text-amber-700">{testType === 'child' ? '儿童精神科医生或儿童心理医生' : '精神科医生或心理医生'}</strong></span>
                </p>
              )}
              
              <p className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">📱</span>
                <span>您可以将结果截图保存，就诊时提供给医生参考</span>
              </p>
              
              {testType === 'child' && (
                <p className="flex items-start gap-3">
                  <span className="text-2xl flex-shrink-0">👨‍👩‍👧</span>
                  <span>建议家长与学校老师沟通，<strong className="text-amber-700">共同关注孩子的行为表现</strong></span>
                </p>
              )}
              
              {/* 根据主导类型提供管理建议 */}
              <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border-l-4 border-green-500">
                <p className="font-bold text-green-900 mb-2 flex items-center gap-2">
                  <span>🌟</span>
                  日常管理建议
                </p>
                {dominantType.type === '注意力缺陷主导型' ? (
                  <ul className="text-sm text-gray-700 space-y-1 ml-4">
                    <li>• 使用番茄工作法，将任务分解成25分钟小块</li>
                    <li>• 创建清晰的待办清单，完成后打勾获得成就感</li>
                    <li>• 减少工作环境中的干扰源（关闭通知、使用降噪耳机）</li>
                    <li>• 重要物品固定位置摆放，建立日常检查清单</li>
                  </ul>
                ) : dominantType.type === '过动冲动主导型' ? (
                  <ul className="text-sm text-gray-700 space-y-1 ml-4">
                    <li>• 安排规律的运动时间，释放过剩精力</li>
                    <li>• 重要决定前给自己"暂停10秒"的缓冲时间</li>
                    <li>• 使用站立式办公桌或坐立球椅，允许身体活动</li>
                    <li>• 练习深呼吸和放松技巧，帮助情绪调节</li>
                  </ul>
                ) : (
                  <ul className="text-sm text-gray-700 space-y-1 ml-4">
                    <li>• 建立结构化的日常作息，设置固定时间段</li>
                    <li>• 结合注意力和运动管理策略，双管齐下</li>
                    <li>• 寻找专业支持，制定个性化管理方案</li>
                    <li>• 加入ADHD互助社群，学习他人的应对经验</li>
                  </ul>
                )}
              </div>
            </div>
          </div>

          {/* 重要声明 - 放在最底部 */}
          <div className="bg-gray-50 border-2 border-gray-200 rounded-2xl p-5 mb-6">
            <div className="flex items-start gap-3">
              <span className="text-2xl flex-shrink-0">⚠️</span>
              <div className="text-left">
                <h3 className="text-base font-bold text-gray-800 mb-2">重要声明</h3>
                <div className="text-sm text-gray-600 space-y-1">
                  <p><strong className="text-red-600">本测试仅供参考，不能替代专业医疗诊断。</strong></p>
                  <p>测试结果不作为医疗诊断依据，如有疑虑请及时咨询专业医生。</p>
                </div>
              </div>
            </div>
          </div>

          {/* 重新测试按钮 */}
          <button
            onClick={() => {
              setCurrentStep('welcome');
              setTestType(null);
              setCurrentQuestion(0);
              setAnswers({});
            }}
            className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white text-lg font-bold py-4 px-6 rounded-2xl hover:from-orange-600 hover:to-amber-600 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center justify-center gap-3"
          >
            重新测试
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="font-sans">
      {currentStep === 'welcome' && <WelcomeScreen />}
      {currentStep === 'test' && <TestScreen />}
      {currentStep === 'results' && <ResultsScreen />}
    </div>
  );
}
export default ADHDTest;
